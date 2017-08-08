'use strict';

/**
 * Use mongo as model
 */
 // More sold
 // More expensive
 // Cheapest items
 // Has discount (offer)
 // last sold
 // Cat Women
 // Cat Men
 // Cat Children
 // All

 class Item {

  // static const QUERIES = {
  //   MORE_SOLD: {order: 'times_sold', desc: true},
  //   MORE_EXPENSIVE: {},
  //   LAST_SOLD: {order: 'last_sold_date', desc: true},
  //   BY_WOMEN: {where: 'category == "women"'},
  //   BY_MEN: {where: 'category == "women"'},
  //   BY_CHILDREN: {where: 'category == "children"'},
  //   ALL: {}
  // }
  constructor(db){
    this._db = db;
  }
  async create(item){
  }
  async update(id, item){
  }
  async remove(id){
  }
  async query({select, where, limit, offset, order}){
  }
  async count({where}){
  }
  async paginate({select, where, limit, order}){
    // const count = await this.count({where});
    // if(count <= limit) yield await this.query({select, where, order});
    // let offset = 0
    // while(count>offset){
    //   let {items} = await this.query({select, where, order, limit, offset});
    //   yield items;
    //   offset+=limit;
    // }
  }
  async import(){
  }
  async export(){
  }
 };

 export default async function(db){
   // Create collection
  return new Item(db);
 }
