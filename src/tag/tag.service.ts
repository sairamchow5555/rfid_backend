import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagReq } from './dto/tag-req';
import { TagReponseModel } from './dto/tag-response-model';
import { TagStatusEnum } from './dto/tag-status-enum';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  // Create Tag
  async createTag(dto: TagReq): Promise<TagReponseModel> {
    // Check if tagName already exists
    const existingTag = await this.tagRepository.findOne({
      where: { tagName: dto.tagName },
    });
    if (existingTag) {
      return new TagReponseModel(false, 409, 'Tag name must be unique', []);
    }

    const tagObj = new TagEntity();
    tagObj.tagId = dto.tagId;
    tagObj.tagName = dto.tagName;

    const savedTag = await this.tagRepository.save(tagObj);

    if (savedTag) {
      return new TagReponseModel(true, 201, 'Tag Created Successfully', [
        savedTag,
      ]);
    } else {
      return new TagReponseModel(false, 400, 'Failed to create tag', []);
    }
  }

  // Get All Open Tags
  async getAllOpenTag(): Promise<TagReponseModel> {
    try {
      const tags = await this.tagRepository.find({
        where: { status: TagStatusEnum.Open },
      });
      return new TagReponseModel(true, 200, 'Open Tags Retrieved', tags);
    } catch (error) {
      return new TagReponseModel(
        false,
        500,
        'Failed to retrieve open tags',
        [],
      );
    }
  }

  // Get All Tags
  async getAllTag(): Promise<TagReponseModel> {
    try {
      const tags = await this.tagRepository.find();
      return new TagReponseModel(true, 200, 'Open Tags Retrieved', tags);
    } catch (error) {
      return new TagReponseModel(false, 500, 'Failed to retrieve tags', []);
    }
  }

  // Update Tag
  async updateTag(id: number, dto: TagReq): Promise<TagReponseModel> {
    const existingTag = await this.tagRepository.findOne({ where: { id } });

    if (!existingTag) {
      return new TagReponseModel(false, 404, 'Tag not found', []);
    }

    // Check if new tagName already exists (excluding the current tag)
    const duplicateTag = await this.tagRepository.findOne({
      where: { tagName: dto.tagName },
    });

    if (duplicateTag && duplicateTag.id !== id) {
      return new TagReponseModel(false, 409, 'Tag name must be unique', []);
    }

    existingTag.tagId = dto.tagId;
    existingTag.tagName = dto.tagName;
    existingTag.status = dto.status;

    const updatedTag = await this.tagRepository.save(existingTag);
    return new TagReponseModel(true, 200, 'Tag Updated Successfully', [
      updatedTag,
    ]);
  }

  // Delete (Change status to 'Close')
  async deleteTag(id: number): Promise<TagReponseModel> {
    const tag = await this.tagRepository.findOne({ where: { id } });

    if (!tag) {
      return new TagReponseModel(false, 404, 'Tag not found', []);
    }

    tag.status = TagStatusEnum.Close;
    const updatedTag = await this.tagRepository.save(tag);

    return new TagReponseModel(true, 200, 'Tag Deleted (Status set to Close)', [
      updatedTag,
    ]);
  }
}
