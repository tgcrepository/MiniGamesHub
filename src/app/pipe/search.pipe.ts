import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    // Specify the type of the filtered items explicitly
    return items.filter((item: any) => {
      // Modify the condition as per your data structure
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
