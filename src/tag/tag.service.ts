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
    try {
      const tagObj = new TagEntity();
      tagObj.tagId = dto.tagId;

      const savedTag = await this.tagRepository.save(tagObj);

      if (savedTag) {
        return new TagReponseModel(true, 1, 'Tag Created Successfully', [
          savedTag,
        ]);
      } else {
        return new TagReponseModel(false, 0, 'Failed to create tag', []);
      }
    } catch (error) {
      throw new Error('Error occurred while creating tag');
    }
  }

  // Get All Open Tags
  async getAllTag(): Promise<TagReponseModel> {
    try {
      const tags = await this.tagRepository.find({
        where: { status: TagStatusEnum.Open },
      });
      if (tags.length === 0) {
        return new TagReponseModel(false, 0, 'No Open tags found', []);
      }

      return new TagReponseModel(true, 1, 'Open Tags Retrieved', tags);
    } catch (error) {
      throw new Error('Error occurred while retrieving tags');
    }
  }

  // Update Tag
  async updateTag(id: number, dto: TagReq): Promise<TagReponseModel> {
    try {
      const existingTag = await this.tagRepository.findOne({ where: { id } });

      if (!existingTag) {
        return new TagReponseModel(false, 0, 'Tag not found', []);
      }

      existingTag.tagId = dto.tagId;
      existingTag.status = dto.status;

      const updatedTag = await this.tagRepository.save(existingTag);
      return new TagReponseModel(true, 1, 'Tag Updated Successfully', [
        updatedTag,
      ]);
    } catch (error) {
      throw new Error('Error occurred while updating Tag');
    }
  }

  // Delete (Change status to 'Close')
  async deleteTag(id: number): Promise<TagReponseModel> {
    try {
      const tag = await this.tagRepository.findOne({ where: { id } });

      if (!tag) {
        return new TagReponseModel(false, 0, 'Tag not found', []);
      }

      tag.status = TagStatusEnum.Close;
      const updatedTag = await this.tagRepository.save(tag);

      return new TagReponseModel(true, 1, 'Tag Deleted (Status set to Close)', [
        updatedTag,
      ]);
    } catch (error) {
      throw new Error('Error occurred while deleting Tag');
    }
  }
}
