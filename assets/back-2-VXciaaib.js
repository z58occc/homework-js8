import"./main-DLpAE0tL.js";import{h as b}from"./moment-C5S46NFB.js";const i="https://livejs-api.hexschool.io",c="z58occc",a="kDx1wSSRDjaVZsyfBiWHwk1tIuv2",h=document.querySelector(".orderPage-table"),j=document.querySelector(".discardAllBtn");u();j.addEventListener("click",function(l){l.preventDefault(),axios.delete(`${i}/api/livejs/v1/admin/${c}/orders`,{headers:{Authorization:a}}).then(function(e){console.log(e),u()}).catch(e=>{console.log(e)})});function u(){axios.get(`${i}/api/livejs/v1/admin/${c}/orders`,{headers:{Authorization:a}}).then(function(l){let e=l.data.orders,s={};for(let t=0;t<e.length;t++)for(let o=0;o<e[t].products.length;o++){let r=e[t].products[o].title;s[r]?s[r]+=1:s[r]=1}let g=Object.keys(s),v=Object.values(s),p=[];for(let t=0;t<g.length;t++)p[t]=[g[t],v[t]];const f=p.sort(function(t,o){return o[1]-t[1]}),m=f.splice(0,3);let $=0;for(let t=0;t<m.length;t++)$+=m[t][1];const n=f.slice(0,3);n.push(["其他",$]),console.log(n),c3.generate({bindto:"#chart",data:{type:"pie",columns:n,colors:{[n[0][0]]:"rgba(218, 203, 255, 1)",[n[1][0]]:"rgba(157, 127, 234, 1)",[n[2][0]]:"rgba(84, 52, 167, 1)",其他:"rgba(48, 30, 95, 1)"}}}),h.innerHTML="";for(let t=0;t<e.length;t++){const o=b.unix(e[t].createdAt).format("YYYY-MM-DD"),r=e[t].products.map(d=>`${d.title}`).join("<br>");h.innerHTML+=`
            <tr>
          <td>${e[t].id}</td>
          <td>
            <p>${e[t].user.name}</p>
            <p>${e[t].user.tel}</p>
          </td>
          <td>${e[t].user.address}</td>
          <td>${e[t].user.email}</td>
          <td>
            ${r}
          </td>
          <td>${o}</td>
          <td class="orderStatus">
            <a href="#">未處理</a>
          </td>
          <td>
            <input id=${e[t].id} type="button" class="delSingleOrder-Btn" value="刪除">
          </td>
        </tr>
            `}document.querySelectorAll(".delSingleOrder-Btn").forEach(t=>{t.addEventListener("click",function(o){const r=o.target.id;console.log(r),axios.delete(`${i}/api/livejs/v1/admin/${c}/orders/${r}`,{headers:{Authorization:a}}).then(function(d){console.log(d),u()}).catch(d=>{console.log(d)})})})}).catch(l=>{console.log(l)})}h.innerHTML=`<thead>
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
