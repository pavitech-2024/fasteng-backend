//test  do index service na marshall;
/*
  async  createFakeDosage(marshallService: MarshallService) {
  // 1️⃣ Cria um userId fake
  const fakeUserId = new Types.ObjectId().toHexString();

  // 2️⃣ Define os dados da dosagem
  const dosageBody = {
    generalData: {
      name: 'Dosagem Teste Fake',
      objective: 'teste',
      dnitBand: 'B',
      description: 'Dosagem criada para teste'
    },
    // adicione outros campos necessários aqui
  };

  // 3️⃣ Chama o service
  const result = await marshallService.saveMarshallDosage(dosageBody, fakeUserId);

  console.log('Dosagem criada:', result);

  // 4️⃣ Retorna o userId e a resposta para usar nos testes
  return {
    userId: fakeUserId,
    dosage: result
  };
}
*/