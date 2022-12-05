export interface IOrderManagementRepository {
  save(OrderManagement: object | undefined): Promise<void>;
}
