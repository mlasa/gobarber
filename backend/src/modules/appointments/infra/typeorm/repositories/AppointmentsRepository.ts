import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>;

	constructor() {
		this.ormRepository = getRepository(Appointment);
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const foundAppointment = await this.ormRepository.findOne({
			where: { date },
		});
		return foundAppointment;
	}

	public async create({
		provider_id,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({ provider_id, date });
		await this.ormRepository.save(appointment);

		return appointment;
	}

	/* public async find(): Promise<Appointment[]> {
		const appointments = await this.ormRepository.find();
		return appointments;
	} */
}

export default AppointmentsRepository;
