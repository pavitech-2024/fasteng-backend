import { Test, TestingModule } from '@nestjs/testing';
import { MaterialsController } from '../../controller';
import { MaterialsService } from '../../service';
import { CreateAsphaltMaterialDto } from '../../dto/create-asphalt-material.dto';
import { Material } from '../../schemas';
import { NotFoundException } from '@nestjs/common';

// Mock completo do MaterialsService com tipagem correta
class MockMaterialsService {
  createMaterial = jest.fn<Promise<Material>, [CreateAsphaltMaterialDto, string]>();
  getMaterial = jest.fn<Promise<{ material: Material; essays: any[] }>, [string]>();
  getAllMaterials = jest.fn<Promise<Material[]>, [string]>();
  getAllMaterialsList = jest.fn<Promise<any>, []>(); // Sem argumentos
  getSelectedMaterialsById = jest.fn<Promise<any>, [string]>();
  updateMaterial = jest.fn<Promise<Material>, [Material]>();
  deleteMaterial = jest.fn<Promise<Material>, [string]>();
}

describe('MaterialsController', () => {
  let controller: MaterialsController;
  let service: MockMaterialsService;

  // Mock data
  const mockMaterial: Material = {
    _id: '65a7f591f4e1a83a6f1b2b3c',
    name: 'Material de Teste',
    type: 'coarseAggregate',
    userId: 'user123',
    createdAt: new Date(),
  };

  const mockCreateDto: CreateAsphaltMaterialDto = {
    name: 'Material de Teste',
    type: 'coarseAggregate',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialsController],
      providers: [
        {
          provide: MaterialsService,
          useClass: MockMaterialsService,
        },
      ],
    }).compile();

    controller = module.get<MaterialsController>(MaterialsController);
    service = module.get(MaterialsService) as MockMaterialsService;

    // Configuração dos mocks com implementações tipadas
    service.createMaterial.mockImplementation((dto, userId) =>
      Promise.resolve({ ...mockMaterial, ...dto, userId })
    );

    service.getMaterial.mockImplementation((id) =>
      id === mockMaterial._id
        ? Promise.resolve({ material: mockMaterial, essays: [] })
        : Promise.reject(new NotFoundException('Material not found'))
    );

    service.getAllMaterials.mockImplementation((userId) =>
      Promise.resolve(userId === 'user123' ? [mockMaterial] : [])
    );

    service.getAllMaterialsList.mockImplementation(() =>
      Promise.resolve({
        materials: [mockMaterial],
        fwdEssays: [],
        iggEssays: [],
        rtcdEssays: [],
        dduiEssays: [],
      })
    );

    service.getSelectedMaterialsById.mockImplementation(() =>
      Promise.resolve({
        materials: [mockMaterial],
        essays: [[]],
      })
    );

    service.updateMaterial.mockImplementation((material) =>
      Promise.resolve({ ...mockMaterial, ...material })
    );

    service.deleteMaterial.mockImplementation((id) =>
      id === mockMaterial._id
        ? Promise.resolve(mockMaterial)
        : Promise.reject(new NotFoundException('Material not found'))
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('POST /asphalt/materials', () => {
    it('should successfully create a material', async () => {
      const result = await controller.createMaterial(mockCreateDto, 'user123');

      expect(result).toEqual({
        ...mockMaterial,
        ...mockCreateDto,
        userId: 'user123',
      });
      expect(service.createMaterial).toHaveBeenCalledWith(mockCreateDto, 'user123');
    });
  });

  describe('GET /asphalt/materials/:id', () => {
    it('should return material with essays when exists', async () => {
      const result = await controller.getMaterialById(mockMaterial._id);

      expect(result).toEqual({
        material: mockMaterial,
        essays: [],
      });
    });

    it('should throw NotFoundException when material not found', async () => {
      await expect(controller.getMaterialById('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('GET /asphalt/materials/all/:id', () => {
    it('should return all materials for user', async () => {
      const result = await controller.getAllByUserId('user123');
      expect(result).toEqual([mockMaterial]);
    });

    it('should return empty array for unknown user', async () => {
      service.getAllMaterials.mockResolvedValueOnce([]);
      const result = await controller.getAllByUserId('unknown-user');
      expect(result).toEqual([]);
    });

    it('should return materials list with essays', async () => {
      const result = await controller.getAllByUserIdList('user123');
      expect(result).toEqual([{
        materials: [mockMaterial],
        fwdEssays: [],
        iggEssays: [],
        rtcdEssays: [],
        dduiEssays: [],
      }]);
    });
  });

  describe('GET /asphalt/materials/selected/:ids', () => {
    it('should return selected materials', async () => {
      const result = await controller.getSelectedMaterialsById('id1,id2');
      expect(result).toEqual({
        materials: [mockMaterial],
        essays: [[]],
      });
    });
  });

  describe('PUT /asphalt/materials/:id', () => {
    it('should update a material', async () => {
      const updatedData = { name: 'Updated Name' };
      const result = await controller.updateMaterialById(mockMaterial._id, {
        ...mockMaterial,
        ...updatedData,
      });

      expect(result.name).toBe('Updated Name');
    });
  });

  describe('DELETE /asphalt/materials/:id', () => {
    it('should delete a material', async () => {
      const result = await controller.deleteMaterialById(mockMaterial._id);
      expect(result).toEqual(mockMaterial);
    });

    it('should throw error when deleting non-existent material', async () => {
      await expect(controller.deleteMaterialById('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });
});
