import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponse, Product, ProductOrder, ProductOrderEvent, ProductoOrderDetail } from '../pages/models/product.interface';
import { APISMAESTROS, PATHS } from 'src/app/core/http/resources/API-RESOURCES';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ITEM_NAME } from 'src/app/shared/services/storage.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService) { }

  postOrderProduct(products: ProductOrderEvent[]): Observable<OrderResponse> {
    const body: ProductOrder = {
      sessionId: this.storageService.getItem(ITEM_NAME.session),
      customerDisplayName: this.storageService.getItem(ITEM_NAME.user),
      orders: products.map(product => {
        return {
          productId: product.product.code,
          receptionPlace: product.product.serviceDestination,
          productName: product.product.name,
          quantity: product.quantity,
          price: product.product.totalCost,
          stationColor: product.product.stationColour,
          details: product.details
        } as ProductoOrderDetail
      })
    }
    return this.http.post<OrderResponse>(`${APISMAESTROS}${PATHS.order}`, body);
  }

  getSummary(sessionId: string): Observable<OrderResponse> {
    const params = new HttpParams().set("sessionId", sessionId);

    return this.http.get<OrderResponse>(`${APISMAESTROS}${PATHS.order}${PATHS.summary}`, { params: params });
  }
}