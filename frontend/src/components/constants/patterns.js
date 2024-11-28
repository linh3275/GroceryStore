export const EMAIL = {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
    message: 'Tên tài khoản Email không hợp lệ !.', 
}

export const name = {
    value: /^[A-Za-zÀ-ỹ]+(?: [A-Za-zÀ-ỹ]+)*$/,
    message: 'Tên không hợp lệ. Vui lòng đặt tên lại !.',
}