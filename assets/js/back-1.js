import moment from "moment";
const baseUrl = "https://livejs-api.hexschool.io";
const apiPath = "z58occc";
const token = "kDx1wSSRDjaVZsyfBiWHwk1tIuv2";
const orderPageTable = document.querySelector(".orderPage-table");
const discardAllBtn = document.querySelector(".discardAllBtn");
initOrder();

//刪除全部訂單
discardAllBtn.addEventListener("click", function (e) {
  e.preventDefault();
  axios
    .delete(`${baseUrl}/api/livejs/v1/admin/${apiPath}/orders`, {
      headers: {
        Authorization: token,
      },
    })
    .then(function (res) {
      console.log(res);
      initOrder();
    })
    .catch((err) => {
      console.log(err);
    });
});

function initOrder() {
  axios
    .get(`${baseUrl}/api/livejs/v1/admin/${apiPath}/orders`, {
      //拿到訂單資料
      headers: {
        Authorization: token,
      },
    })
    .then(function (res) {
      let orders = res.data.orders;
      let obj = {};
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].products.length; j++) {
          let category = orders[i].products[j].category;
          if (!obj[category]) {
            obj[category] = 1;
          } else {
            obj[category] += 1;
          }
        }
      }
      let keys = Object.keys(obj);
      let values = Object.values(obj);
      let arr = [];
      for (let i = 0; i < keys.length; i++) {
        arr[i] = [keys[i], values[i]];
      }

      // C3.js
      let chart = c3.generate({
        bindto: "#chart", // HTML 元素綁定
        data: {
          type: "pie",
          columns: arr,
          colors: {
            床架: "rgba(218, 203, 255, 1)",
            收納: "rgba(157, 127, 234, 1)",
            窗簾: "rgba(84, 52, 167, 1)",
          },
        },
      });

      orderPageTable.innerHTML = "";

      for (let i = 0; i < orders.length; i++) {
        const time = moment.unix(orders[i].createdAt).format("YYYY-MM-DD");
        const productList = orders[i].products
          .map((item) => `${item.title}`)
          .join("<br>");

        orderPageTable.innerHTML += `
            <tr>
          <td>${orders[i].id}</td>
          <td>
            <p>${orders[i].user.name}</p>
            <p>${orders[i].user.tel}</p>
          </td>
          <td>${orders[i].user.address}</td>
          <td>${orders[i].user.email}</td>
          <td>
            ${productList}
          </td>
          <td>${time}</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input id=${orders[i].id} type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>
            `;

        const delSingleOrderBtn = document.querySelectorAll(
          ".delSingleOrder-Btn"
        );

        // 刪除訂單
        delSingleOrderBtn.forEach((el) => {
          el.addEventListener("click", function (e) {
            const id = e.target.id;
            axios
              .delete(
                `${baseUrl}/api/livejs/v1/admin/${apiPath}/orders/${id}`,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              )
              .then(function (res) {
                console.log(res);
                initOrder();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

orderPageTable.innerHTML = `
   <thead>
     <tr>
       <th>訂單編號</th>
       <th>聯絡人</th>
       <th>聯絡地址</th>
       <th>電子郵件</th>
       <th>訂單品項</th>
       <th>訂單日期</th>
       <th>訂單狀態</th>
       <th>操作</th>
     </tr>
   </thead>
   `;
