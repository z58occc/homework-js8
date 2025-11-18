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
      initOrder();
    })
    .catch((err) => {});
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
      let objCategory = {};
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].products.length; j++) {
          let category = orders[i].products[j].category;
          if (!objCategory[category]) {
            objCategory[category] = 1;
          } else {
            objCategory[category] += 1;
          }
        }
      }
      let keysCategory = Object.keys(objCategory);
      let valuesCategory = Object.values(objCategory);
      let arrCategory = [];
      for (let i = 0; i < keysCategory.length; i++) {
        arrCategory[i] = [keysCategory[i], valuesCategory[i]];
      }

      // C3.js
      let chart1 = c3.generate({
        bindto: "#chart-1", // HTML 元素綁定
        data: {
          type: "pie",
          columns: arrCategory,
          colors: {
            床架: "rgba(218, 203, 255, 1)",
            收納: "rgba(157, 127, 234, 1)",
            窗簾: "rgba(84, 52, 167, 1)",
          },
        },
      });

      let objTitle = {};
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].products.length; j++) {
          let title = orders[i].products[j].title;
          if (!objTitle[title]) {
            objTitle[title] = 1;
          } else {
            objTitle[title] += 1;
          }
        }
      }
      let keysTitle = Object.keys(objTitle);
      let valuesTitle = Object.values(objTitle);
      let arrTitle = [];
      for (let i = 0; i < keysTitle.length; i++) {
        arrTitle[i] = [keysTitle[i], valuesTitle[i]];
      }
      const newArr = arrTitle.sort(function (a, b) {
        return b[1] - a[1];
      });

      const others = newArr.splice(0, 3);
      let sum = 0;
      for (let i = 0; i < others.length; i++) {
        sum += others[i][1];
      }
      const final = newArr.slice(0, 3);
      final.push(["其他", sum]);

      // C3.js
      let chart2 = c3.generate({
        bindto: "#chart-2", // HTML 元素綁定
        data: {
          type: "pie",
          columns: final,
          colors: {
            [final[0][0]]: "rgba(218, 203, 255, 1)",
            [final[1][0]]: "rgba(157, 127, 234, 1)",
            [final[2][0]]: "rgba(84, 52, 167, 1)",
            其他: "rgba(48, 30, 95, 1)",
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
            <a class="putBtn" data-paid=${orders[i].paid} data-id=${
          orders[i].id
        } href="#">
            ${orders[i].paid ? "已處理" : "未處理"}
            </a>
          </td>
          <td>
            <input id=${
              orders[i].id
            } type="button" class="delSingleOrder-Btn" value="刪除">
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
                alert("刪除成功");
                initOrder();
              })
              .catch((err) => {
                alert("刪除失敗");
              });
          });
        });

        // 修改訂單狀態
        const putBtns = document.querySelectorAll(".putBtn");
        putBtns.forEach((el) => {
          el.addEventListener("click", function (e) {
            e.preventDefault();
            let id = e.target.getAttribute("data-id");
            let hasPaid =
              e.target.getAttribute("data-paid") === "true" ? true : false;

            axios
              .put(
                `${baseUrl}/api/livejs/v1/admin/${apiPath}/orders`,
                {
                  data: {
                    id: id,
                    paid: !hasPaid,
                  },
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              )
              .then(function (res) {
                alert("刪除成功");
                initOrder();
              })
              .catch((err) => {
                alert("刪除失敗");
              });
          });
        });
      }
    })
    .catch((err) => {
      alert("發生錯誤");
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
      alert("刪除成功");
      renderOrder();
    })
    .catch((err) => {
      alert("刪除失敗");
    });
});
