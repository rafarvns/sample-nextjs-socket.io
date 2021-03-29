# Sample NestJS API with TypeORM, JWT Auth, Socket.io and as was done

## TypeORM
### Add Dependencies
```nodejs
$ npm i -g typeorm
$ npm install --save @nestjs/typeorm typeorm sqlite3
```
### Import TypeOrmModule and set your database configs
```typescript
@Module({
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/database.db',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
}),
```
#
## Auth
### Add Dependencies
```nodejs
$ npm add bcrypt @nestjs/passport @nestjs/jwt passport passport-jwt
$ npm add @types/bcrypt @types/passport @types/passport-jwt -D
```
### Generate the user module
```nodejs
$ nest g mo user
```
### Create the user entity
```nodejs
Create the file:
src/user/user.entity.ts
```
```typescript
Fill src/user/user.entity.ts with: 

import * as bcrypt from 'bcrypt';
@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn('uuid') id: string;  

    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    username: string;

    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string; 

    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    email: string;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
```
#
## Socket.io
### Generating a gateway with nestjs-cli
```nodejs
$ npm g gateway GatewayName
```
### For test the socket.io, download firecamp.io
```nodejs
https://firecamp.io/
```

https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication