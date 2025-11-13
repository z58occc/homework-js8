import"./main-DLpAE0tL.js";import{h as v}from"./moment-C5S46NFB.js";const a="https://livejs-api.hexschool.io",s="z58occc",c="kDx1wSSRDjaVZsyfBiWHwk1tIuv2",h=document.querySelector(".orderPage-table"),b=document.querySelector(".discardAllBtn");u();b.addEventListener("click",function(r){r.preventDefault(),axios.delete(`${a}/api/livejs/v1/admin/${s}/orders`,{headers:{Authorization:c}}).then(function(e){console.log(e),u()}).catch(e=>{console.log(e)})});function u(){axios.get(`${a}/api/livejs/v1/admin/${s}/orders`,{headers:{Authorization:c}}).then(function(r){let e=r.data.orders,o={};for(let t=0;t<e.length;t++)for(let n=0;n<e[t].products.length;n++){let d=e[t].products[n].category;o[d]?o[d]+=1:o[d]=1}let g=Object.keys(o),f=Object.values(o),p=[];for(let t=0;t<g.length;t++)p[t]=[g[t],f[t]];c3.generate({bindto:"#chart",data:{type:"pie",columns:p,colors:{床架:"rgba(218, 203, 255, 1)",收納:"rgba(157, 127, 234, 1)",窗簾:"rgba(84, 52, 167, 1)"}}}),h.innerHTML="";for(let t=0;t<e.length;t++){const n=v.unix(e[t].createdAt).format("YYYY-MM-DD"),d=e[t].products.map(l=>`${l.title}`).join("<br>");h.innerHTML+=`
            <tr>
          <td>${e[t].id}</td>
          <td>
            <p>${e[t].user.name}</p>
            <p>${e[t].user.tel}</p>
          </td>
          <td>${e[t].user.address}</td>
          <td>${e[t].user.email}</td>
          <td>
            ${d}
          </td>
          <td>${n}</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input id=${e[t].id} type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>
            `,document.querySelectorAll(".delSingleOrder-Btn").forEach(l=>{l.addEventListener("click",function($){const m=$.target.id;axios.delete(`${a}/api/livejs/v1/admin/${s}/orders/${m}`,{headers:{Authorization:c}}).then(function(i){console.log(i),u()}).catch(i=>{console.log(i)})})})}}).catch(r=>{console.log(r)})}h.innerHTML=`
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
