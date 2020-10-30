import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
import { Tag } from "./Tag";
  
  @Entity()
  @Unique(["username"])
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 20)
    username: string;

    @Column()
    birthDate: Date;

    @Column()
    phoneNumber: number;

    @Column()
    @Length(0, 40)
    email: string;

    
    @Column()
    @Length(0, 150)
    address: string;

    @Column()
    @Length(0, 255)
    picture: string;
  
    
    @OneToMany(type => Tag, tag => tag.user)
    tags: Tag[];

    @Column()
    @Length(4, 100)
    password: string;
  
    @Column()
    @IsNotEmpty()
    role: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) createdAt: Date;
   
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updatedAt: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }