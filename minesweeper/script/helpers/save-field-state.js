export function saveFieldState() {
    const allCells = document.querySelectorAll('.cell');
    const fieldState = [...allCells].map( item => {
        return {
            id: item.id,
            class: item.className ,
            span: item.innerHTML
        }
    });

    localStorage.setItem('_fieldState', JSON.stringify(fieldState));
}