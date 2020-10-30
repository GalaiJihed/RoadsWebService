import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
import { User } from "../entity/User";
 
  
  @Entity()
  export class Tag {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4, 40)
    route: string;

    @Column({ type: "float", precision: 10, scale: 6 })
    latitude: number;

    @Column({ type: "float", precision: 10, scale: 6 })
    longitude: number;
    
    @Column()
    @Length(4, 100)
    picture: string;
   
    @Column()
    @Length(4, 100)
    titre: string;

    @Column()
    @Length(4, 100)
    ville: string;

    @ManyToOne(type => User, user => user.tags ,  { onDelete: 'CASCADE' })
    user: User;
  
    @Column()
    @Length(4, 200)
    description: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) createdAt: Date;
   
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'}) updatedAt: Date;
   
 
  }
