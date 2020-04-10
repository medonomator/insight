export interface IBaseInstanceInfo {
  id: string;
  createdAt: Date;
  updateAt: Date;
}

export interface IUserProps {
  orgId: string;
  token: string;
}

export interface IUserAttributes extends IUserProps, IBaseInstanceInfo {
  isActive: boolean;
  isDeleted: boolean;
}

export type IUserInstance = IUserProps & IUserAttributes;
