import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Product } from '../pages/models/product.interface';
import { APICONFIGURADOR, PATHS } from 'src/app/core/http/resources/API-RESOURCES';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${APICONFIGURADOR}${PATHS.categories}`);
  }

  getProductsByCode(category: string | null): Observable<Product[]> {
    const params = new HttpParams()
                      .set('category', category ? category : 'Recomendados')
                      .set('catalog', 'Komorebi');
    return this.http.get<Product[]>(`${APICONFIGURADOR}${PATHS.products}`, { params: params });
  }
}