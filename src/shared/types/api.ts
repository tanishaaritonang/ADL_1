export type Timestamps = {
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

export type BaseEntity = {
  id: string;
} & Timestamps;

export type Entity<T> = T & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
};

export type SoftDeletable = {
  isDeleted: boolean;
  deletedAt?: number;
};

export type Auditable = {
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
};

export type RobustEntity<T> = Entity<T> & Partial<SoftDeletable & Auditable>;
