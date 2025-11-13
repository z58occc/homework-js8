import"./main-DLpAE0tL.js";import{h as b}from"./moment-C5S46NFB.js";const a="https://livejs-api.hexschool.io",l="z58occc",c="kDx1wSSRDjaVZsyfBiWHwk1tIuv2",h=document.querySelector(".orderPage-table"),j=document.querySelector(".discardAllBtn");u();j.addEventListener("click",function(i){i.preventDefault(),axios.delete(`${a}/api/livejs/v1/admin/${l}/orders`,{headers:{Authorization:c}}).then(function(e){u()}).catch(e=>{})});function u(){axios.get(`${a}/api/livejs/v1/admin/${l}/orders`,{headers:{Authorization:c}}).then(function(i){let e=i.data.orders,o={};for(let t=0;t<e.length;t++)for(let r=0;r<e[t].products.length;r++){let n=e[t].products[r].title;o[n]?o[n]+=1:o[n]=1}let p=Object.keys(o),v=Object.values(o),f=[];for(let t=0;t<p.length;t++)f[t]=[p[t],v[t]];const g=f.sort(function(t,r){return r[1]-t[1]}),m=g.splice(0,3);let $=0;for(let t=0;t<m.length;t++)$+=m[t][1];const d=g.slice(0,3);d.push(["其他",$]),c3.generate({bindto:"#chart",data:{type:"pie",columns:d,colors:{[d[0][0]]:"rgba(218, 203, 255, 1)",[d[1][0]]:"rgba(157, 127, 234, 1)",[d[2][0]]:"rgba(84, 52, 167, 1)",其他:"rgba(48, 30, 95, 1)"}}}),h.innerHTML="";for(let t=0;t<e.length;t++){const r=b.unix(e[t].createdAt).format("YYYY-MM-DD"),n=e[t].products.map(s=>`${s.title}`).join("<br>");h.innerHTML+=`
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
          <td>${r}</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input id=${e[t].id} type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>
            `}document.querySelectorAll(".delSingleOrder-Btn").forEach(t=>{t.addEventListener("click",function(r){const n=r.target.id;axios.delete(`${a}/api/livejs/v1/admin/${l}/orders/${n}`,{headers:{Authorization:c}}).then(function(s){u()}).catch(s=>{})})})}).catch(i=>{})}h.innerHTML=`<thead>
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
        </thead>`;
