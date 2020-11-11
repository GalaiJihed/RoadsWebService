
import { Length } from "class-validator";
import {
    Column,
    Entity, PrimaryGeneratedColumn,
  
  } from "typeorm";

 
  
  @Entity()
  export class Store {

    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    Name: string;
   
    @Column()
    Address: string;
   
    @Column()
    Phone: number;
   
    @Column()
    ImageUrl: string;
  
    @Column()
    Type: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) createdAt: Date;
   
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updatedAt: Date;
  

  }
