import { BaseEntity, RobustEntity } from "./api";
import { ListParams, PaginatedResponse } from "./response";

export type CreateEntity<T> = Omit<T, keyof BaseEntity>;
export type UpdateEntity<T> = Partial<Omit<T, keyof BaseEntity>> & { id: string };

export interface Repository<T> {
  findById(id: string): Promise<RobustEntity<T> | null>;
  findAll(params?: ListParams): Promise<PaginatedResponse<RobustEntity<T>>>;
  create(data: CreateEntity<T>): Promise<RobustEntity<T>>;
  update(id: string, data: UpdateEntity<T>): Promise<RobustEntity<T>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<RobustEntity<T>>;
  restore(id: string): Promise<RobustEntity<T>>;
  exists(id: string): Promise<boolean>;
}