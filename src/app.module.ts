import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      // common database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/common?retryWrites=true&w=majority',
      { connectionName: 'common' },
    ),
    MongooseModule.forRoot(
      // asphalt database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/asphalt?retryWrites=true&w=majority',
      { connectionName: 'asphalt' },
    ),
    MongooseModule.forRoot(
      // soils database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/soils?retryWrites=true&w=majority',
      { connectionName: 'soils' },
    ),
    MongooseModule.forRoot(
      // concrete database
      'mongodb+srv://fasteng:dHjGSHOkTHRAwTN5@fasteng.fdugqs8.mongodb.net/concrete?retryWrites=true&w=majority',
      { connectionName: 'concrete' },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
