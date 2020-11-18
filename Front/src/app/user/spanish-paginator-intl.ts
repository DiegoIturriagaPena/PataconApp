import { MatPaginatorIntl } from '@angular/material';
export function spanishPaginator() {
    const paginatorIntl = new MatPaginatorIntl();
    
    paginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    paginatorIntl.nextPageLabel = 'Volgende pagina';
    paginatorIntl.previousPageLabel = 'Vorige pagina';
    
    return paginatorIntl;
  }