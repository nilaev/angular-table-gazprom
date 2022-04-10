import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  getPosts() {
    return axios.get('https://jsonplaceholder.typicode.com/users');
  }
}
