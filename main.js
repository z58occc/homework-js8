import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

const baseUrl = "https://livejs-api.hexschool.io";
const apiPath = "z58occc";
const productWrap = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const shoppingCartTable = document.querySelector(".shoppingCart-table");
const orderForm = document.querySelector(".orderInfo-form");
let data;

// 拿到資料 產品 購物車
axios
  .get(`${baseUrl}/api/livejs/v1/customer/${apiPath}/products`)
  .then(function (res) {
    data = res.data.products;
    renderData(data);
  })
  .catch((err) => {
    console.log(err);
  });

renderCart();

//篩選
productSelect.addEventListener("change", function (e) {
  let value = e.target.value;
  let arr;
  arr = value !== "全部" ? data.filter((el) => el.category === value) : data;
  renderData(arr);
});

// 渲染
function renderData(data) {
  productWrap.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    productWrap.innerHTML += `<li class="productCard">
          <h4 class="productType">新品</h4>
          <img
            src=${data[i].images}
            alt="">
          <a id=${data[i].id} class="addCardBtn">加入購物車</a>
          <h3>${data[i].title}</h3>
          <del class="originPrice">${data[i].origin_price}</del>
          <p class="nowPrice">${data[i].price}</p>
        </li>`;
  }

  const addCardBtn = document.querySelectorAll(".addCardBtn");
  addCardBtn.forEach((el) => {
    el.addEventListener("click", function (e) {
      let productId = e.target.getAttribute("id");
      let obj = {
        data: {
          productId: productId,
          quantity: 1,
        },
      };
      axios
        .post(`${baseUrl}/api/livejs/v1/customer/${apiPath}/carts`, obj)
        .then(function (res) {
          console.log(res);
          renderCart();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
}

function renderCart() {
  axios
    .get(`${baseUrl}/api/livejs/v1/customer/${apiPath}/carts`)
    .then(function (res) {
      let data = res.data.carts;
      shoppingCartTable.innerHTML = `
  <tr>
            <th width="40%">品項</th>
            <th width="15%">單價</th>
            <th width="15%">數量</th>
            <th width="15%">金額</th>
            <th width="15%"></th>
          </tr>
  `;
      let num = 0;
      for (let i = 0; i < data.length; i++) {
        shoppingCartTable.innerHTML += `
    <tr>
             <td>
               <div class="cardItem-title">
                 <img src=${data[i].product.images} alt="">
                 <p>${data[i].product.title}</p>
               </div>
             </td>
             <td>${data[i].product.price}</td>
             <td>${data[i].quantity}</td>
             <td>${data[i].product.price * data[i].quantity}</td>
             <td  class="discardBtn">
               <a id=${data[i].id} class="material-icons">
                 clear
               </a>
             </td>
           </tr>
    `;
        num += data[i].product.price * data[i].quantity;
      }
      shoppingCartTable.innerHTML += `
   <tr>
            <td>
              <a href="#" class="discardAllBtn">刪除所有品項</a>
            </td>
            <td></td>
            <td></td>
            <td>
              <p>總金額</p>
            </td>
            <td>NT$${num}</td>
          </tr>
  `;
      const discardAllBtn = document.querySelector(".discardAllBtn");
      discardAllBtn.addEventListener("click", function (e) {
        e.preventDefault();
        axios.delete(`${baseUrl}/api/livejs/v1/customer/${apiPath}/carts`);
        renderCart();
      });

      const discardBtn = document.querySelectorAll(".material-icons");
      discardBtn.forEach((el) => {
        el.addEventListener("click", function (e) {
          let productId = e.target.id;
          axios
            .delete(
              `${baseUrl}/api/livejs/v1/customer/${apiPath}/carts/${productId}`
            )
            .then(function (res) {
              console.log(res);
              renderCart();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    });
}
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(orderForm);
  const dataObj = Object.fromEntries(formData.entries());
  console.log(dataObj);

  const orderObj = {
    data: {
      user: {
        name: dataObj["姓名"],
        tel: dataObj["電話"],
        email: dataObj["Email"],
        address: dataObj["寄送地址"],
        payment: dataObj["交易方式"],
      },
    },
  };
  axios
    .post(`${baseUrl}/api/livejs/v1/customer/${apiPath}/orders`, orderObj)
    .then(function (res) {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
