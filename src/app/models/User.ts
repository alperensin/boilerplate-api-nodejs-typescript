import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email:string;
  
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const salt = bcrypt.genSaltSync(+process.env.PW_ENCRYPT_FORCE!);
    this.password = bcrypt.hashSync(this.password, salt);
  }
}

export default User;