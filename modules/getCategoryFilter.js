export const getCategoryFilter = (list) => {
    const categoriasEnLista = list.map((item) => `${item.TypeProperty}2`);
    const categoriasDeFiltrado = [...new Set(categoriasEnLista)];
    console.log(categoriasDeFiltrado);
    return categoriasDeFiltrado;
}
