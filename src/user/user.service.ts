import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {}

export type User = {
  id: string;
  matricula: string;
  passwordHash: string;
  vehicleType: string;
  role: 'patrulha' | 'central';
};

export class UsersService {
  // two patrulhas + one central
  //todo: futuramente cirar um banco para isso
  private users: User[] = [
    // Carros
    { id: 'CAR-001', matricula: '9001', passwordHash: bcrypt.hashSync('senhaCar1', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-002', matricula: '9002', passwordHash: bcrypt.hashSync('senhaCar2', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-003', matricula: '9003', passwordHash: bcrypt.hashSync('senhaCar3', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-004', matricula: '9004', passwordHash: bcrypt.hashSync('senhaCar4', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-005', matricula: '9005', passwordHash: bcrypt.hashSync('senhaCar5', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-006', matricula: '9006', passwordHash: bcrypt.hashSync('senhaCar6', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-007', matricula: '9007', passwordHash: bcrypt.hashSync('senhaCar7', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-008', matricula: '9008', passwordHash: bcrypt.hashSync('senhaCar8', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-009', matricula: '9009', passwordHash: bcrypt.hashSync('senhaCar9', 10), vehicleType: 'carro', role: 'patrulha' },
    { id: 'CAR-010', matricula: '9010', passwordHash: bcrypt.hashSync('senhaCar10', 10), vehicleType: 'carro', role: 'patrulha' },

    // Motos
    { id: 'MOTO-001', matricula: '9101', passwordHash: bcrypt.hashSync('senhaMoto1', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-002', matricula: '9102', passwordHash: bcrypt.hashSync('senhaMoto2', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-003', matricula: '9103', passwordHash: bcrypt.hashSync('senhaMoto3', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-004', matricula: '9104', passwordHash: bcrypt.hashSync('senhaMoto4', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-005', matricula: '9105', passwordHash: bcrypt.hashSync('senhaMoto5', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-006', matricula: '9106', passwordHash: bcrypt.hashSync('senhaMoto6', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-007', matricula: '9107', passwordHash: bcrypt.hashSync('senhaMoto7', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-008', matricula: '9108', passwordHash: bcrypt.hashSync('senhaMoto8', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-009', matricula: '9109', passwordHash: bcrypt.hashSync('senhaMoto9', 10), vehicleType: 'moto', role: 'patrulha' },
    { id: 'MOTO-010', matricula: '9110', passwordHash: bcrypt.hashSync('senhaMoto10', 10), vehicleType: 'moto', role: 'patrulha' },

    // Operador Central
    { id: 'OP-CENTRAL', matricula: '0001', passwordHash: bcrypt.hashSync('admin', 10), vehicleType: 'desk', role: 'central' },
  ];


  async findByMatricula(matricula: string) {
    return this.users.find(u => u.matricula === matricula);
  }
}
