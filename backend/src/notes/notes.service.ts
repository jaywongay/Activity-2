import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAll(userId: number): Promise<Note[]> {
    return this.notesRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id, userId } });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    // userId comes from the JWT token of the logged-in user
    // Example: if user with id=5 is logged in, userId will be 5
    // Instead of hardcoded userId: 1 for everyone
    const note = this.notesRepository.create({
      ...createNoteDto,
      userId, // This is now the REAL user ID, not hardcoded 1
    });
    return this.notesRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<Note> {
    const note = await this.findOne(id, userId);
    Object.assign(note, updateNoteDto);
    return this.notesRepository.save(note);
  }

  async remove(id: number, userId: number): Promise<void> {
    const note = await this.findOne(id, userId);
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Note not found');
    }
  }
}