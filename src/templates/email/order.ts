import { OrderResp } from "../../interfaces/orders";

export function orderEmailTemplate(ordersResp: OrderResp): string {
    if(ordersResp.isSuccess) {
        let ordersTable: string = '';
        ordersResp.order.forEach( order => {
            ordersTable += `
            <tr>
                <td>${order.product.name}</td>
                <td>${order.count}</td>
                <td>${order.product.price} zł</td>
            </tr>`
        })

        return `
            <h1>Twoje zamówienie zostało złożone</h1>
            <h2>Zamówienie</h2>
            <table cellpadding="10" cellspacing="0" border="1" >
            <tr>
              <td>Produkt</td>
              <td>Ilość</td>
              <td>Cena</td>
             </tr>
             ${ordersTable}
            </table>
        `
    }
}