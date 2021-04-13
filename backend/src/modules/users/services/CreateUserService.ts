import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) { }

	public async execute({ name, email, password }: IRequest): Promise<User> {
		const checkExistingEmail = await this.usersRepository.findByEmail(email);

		if (checkExistingEmail) {
			throw new AppError('This e-mail already exists', 400);
		}

		const hashedPassword = await hash(password, 8);
		console.log('I will create');
		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		});

		delete user.password;

		return user;
	}
}
export default CreateUserService;