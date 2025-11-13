import"./main-DLpAE0tL.js";import{h as v}from"./moment-C5S46NFB.js";const a="https://livejs-api.hexschool.io",s="z58occc",l="kDx1wSSRDjaVZsyfBiWHwk1tIuv2",c=document.querySelector(".orderPage-table"),b=document.querySelector(".discardAllBtn");h();b.addEventListener("click",function(o){o.preventDefault(),axios.delete(`${a}/api/livejs/v1/admin/${s}/orders`,{headers:{Authorization:l}}).then(function(e){h()}).catch(e=>{})});function h(){axios.get(`${a}/api/livejs/v1/admin/${s}/orders`,{headers:{Authorization:l}}).then(function(o){let e=o.data.orders,r={};for(let t=0;t<e.length;t++)for(let d=0;d<e[t].products.length;d++){let n=e[t].products[d].category;r[n]?r[n]+=1:r[n]=1}let u=Object.keys(r),g=Object.values(r),p=[];for(let t=0;t<u.length;t++)p[t]=[u[t],g[t]];c3.generate({bindto:"#chart",data:{type:"pie",columns:p,colors:{床架:"rgba(218, 203, 255, 1)",收納:"rgba(157, 127, 234, 1)",窗簾:"rgba(84, 52, 167, 1)"}}}),c.innerHTML="";for(let t=0;t<e.length;t++){const d=v.unix(e[t].createdAt).format("YYYY-MM-DD"),n=e[t].products.map(i=>`${i.title}`).join("<br>");c.innerHTML+=`
            <tr>
          <td>${e[t].id}</td>
          <td>
            <p>${e[t].user.name}</p>
            <p>${e[t].user.tel}</p>
          </td>
          <td>${e[t].user.address}</td>
          <td>${e[t].user.email}</td>
          <td>
            ${n}
          </td>
          <td>${d}</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input id=${e[t].id} type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>
            `,document.querySelectorAll(".delSingleOrder-Btn").forEach(i=>{i.addEventListener("click",function(f){const $=f.target.id;axios.delete(`${a}/api/livejs/v1/admin/${s}/orders/${$}`,{headers:{Authorization:l}}).then(function(m){h()}).catch(m=>{})})})}}).catch(o=>{})}c.innerHTML=`
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
