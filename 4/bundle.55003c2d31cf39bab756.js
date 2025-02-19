(()=>{var e={353:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,i="millisecond",a="second",n="minute",s="hour",r="day",c="week",o="month",d="quarter",f="year",l="date",p="Invalid Date",b=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,u=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},m=function(e,t,i){var a=String(e);return!a||a.length>=t?e:""+Array(t+1-a.length).join(i)+e},v={s:m,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),a=Math.floor(i/60),n=i%60;return(t<=0?"+":"-")+m(a,2,"0")+":"+m(n,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var a=12*(i.year()-t.year())+(i.month()-t.month()),n=t.clone().add(a,o),s=i-n<0,r=t.clone().add(a+(s?-1:1),o);return+(-(a+(i-n)/(s?n-r:r-n))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:f,w:c,d:r,D:l,h:s,m:n,s:a,ms:i,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",y={};y[_]=h;var g=function(e){return e instanceof w},$=function e(t,i,a){var n;if(!t)return _;if("string"==typeof t){var s=t.toLowerCase();y[s]&&(n=s),i&&(y[s]=i,n=s);var r=t.split("-");if(!n&&r.length>1)return e(r[0])}else{var c=t.name;y[c]=t,n=c}return!a&&n&&(_=n),n||!a&&_},T=function(e,t){if(g(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new w(i)},M=v;M.l=$,M.i=g,M.w=function(e,t){return T(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function h(e){this.$L=$(e.locale,null,!0),this.parse(e)}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var a=t.match(b);if(a){var n=a[2]-1||0,s=(a[7]||"0").substring(0,3);return i?new Date(Date.UTC(a[1],n,a[3]||1,a[4]||0,a[5]||0,a[6]||0,s)):new Date(a[1],n,a[3]||1,a[4]||0,a[5]||0,a[6]||0,s)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(e,t){var i=T(e);return this.startOf(t)<=i&&i<=this.endOf(t)},m.isAfter=function(e,t){return T(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<T(e)},m.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var i=this,d=!!M.u(t)||t,p=M.p(e),b=function(e,t){var a=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return d?a:a.endOf(r)},u=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},h=this.$W,m=this.$M,v=this.$D,_="set"+(this.$u?"UTC":"");switch(p){case f:return d?b(1,0):b(31,11);case o:return d?b(1,m):b(0,m+1);case c:var y=this.$locale().weekStart||0,g=(h<y?h+7:h)-y;return b(d?v-g:v+(6-g),m);case r:case l:return u(_+"Hours",0);case s:return u(_+"Minutes",1);case n:return u(_+"Seconds",2);case a:return u(_+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var c,d=M.p(e),p="set"+(this.$u?"UTC":""),b=(c={},c[r]=p+"Date",c[l]=p+"Date",c[o]=p+"Month",c[f]=p+"FullYear",c[s]=p+"Hours",c[n]=p+"Minutes",c[a]=p+"Seconds",c[i]=p+"Milliseconds",c)[d],u=d===r?this.$D+(t-this.$W):t;if(d===o||d===f){var h=this.clone().set(l,1);h.$d[b](u),h.init(),this.$d=h.set(l,Math.min(this.$D,h.daysInMonth())).$d}else b&&this.$d[b](u);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(i,d){var l,p=this;i=Number(i);var b=M.p(d),u=function(e){var t=T(p);return M.w(t.date(t.date()+Math.round(e*i)),p)};if(b===o)return this.set(o,this.$M+i);if(b===f)return this.set(f,this.$y+i);if(b===r)return u(1);if(b===c)return u(7);var h=(l={},l[n]=e,l[s]=t,l[a]=1e3,l)[b]||1,m=this.$d.getTime()+i*h;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||p;var a=e||"YYYY-MM-DDTHH:mm:ssZ",n=M.z(this),s=this.$H,r=this.$m,c=this.$M,o=i.weekdays,d=i.months,f=function(e,i,n,s){return e&&(e[i]||e(t,a))||n[i].slice(0,s)},l=function(e){return M.s(s%12||12,e,"0")},b=i.meridiem||function(e,t,i){var a=e<12?"AM":"PM";return i?a.toLowerCase():a},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:c+1,MM:M.s(c+1,2,"0"),MMM:f(i.monthsShort,c,d,3),MMMM:f(d,c),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:f(i.weekdaysMin,this.$W,o,2),ddd:f(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:M.s(s,2,"0"),h:l(1),hh:l(2),a:b(s,r,!0),A:b(s,r,!1),m:String(r),mm:M.s(r,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:n};return a.replace(u,(function(e,t){return t||h[e]||n.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(i,l,p){var b,u=M.p(l),h=T(i),m=(h.utcOffset()-this.utcOffset())*e,v=this-h,_=M.m(this,h);return _=(b={},b[f]=_/12,b[o]=_,b[d]=_/3,b[c]=(v-m)/6048e5,b[r]=(v-m)/864e5,b[s]=v/t,b[n]=v/e,b[a]=v/1e3,b)[u]||v,p?_:M.a(_)},m.daysInMonth=function(){return this.endOf(o).$D},m.$locale=function(){return y[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),a=$(e,t,!0);return a&&(i.$L=a),i},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),j=w.prototype;return T.prototype=j,[["$ms",i],["$s",a],["$m",n],["$H",s],["$W",r],["$M",o],["$y",f],["$D",l]].forEach((function(e){j[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),T.extend=function(e,t){return e.$i||(e(t,w,T),e.$i=!0),T},T.locale=$,T.isDayjs=g,T.unix=function(e){return T(1e3*e)},T.en=y[_],T.Ls=y,T.p={},T}()}},t={};function i(a){var n=t[a];if(void 0!==n)return n.exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,i),s.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var a in t)i.o(t,a)&&!i.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=i(353),t=i.n(e);const a=e=>`${e[0].toUpperCase()}${e.slice(1)}`,n=e=>e<10?`0${e}`:e.toString(),s=(e,i)=>i?t()(i).format(e):"",r=e=>s("HH:mm",e),c=e=>s("YYYY-MM-DDTHH:MM",e),o=[{id:"5e52eb63-20bf-48e3-824c-d5d4538101c7",basePrice:2511,dateFrom:"2025-02-10T02:17:12.957Z",dateTo:"2025-02-10T11:33:12.957Z",destination:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",isFavorite:!0,offers:["cba06821-0983-48e1-a3e0-af055ab42e69","601f1aa7-01b5-4c99-9c64-8270b76ee1ed","a2026208-7504-446b-ae62-f71e89879210","f3a8c33b-3019-4bc8-9881-fdcf296b9027"],type:"ship"},{id:"35a8c6bd-951f-4e5b-b181-7bdae43956f5",basePrice:8626,dateFrom:"2025-02-11T22:40:12.957Z",dateTo:"2025-02-12T19:35:12.957Z",destination:"c068f6d3-e08c-4817-98a2-5b8cbd13df72",isFavorite:!0,offers:["cfd32a95-916e-43bb-ac0b-ac92215e7ea8","dc7e4af4-1371-42fe-9f60-e75e82f96dca","cf351d11-b6cd-4ce6-86b1-09ba32e6a271","a749c843-4981-4d38-892b-076437c24597"],type:"check-in"},{id:"8e33271f-8de9-4ff4-916b-d0577bca5862",basePrice:6698,dateFrom:"2025-02-13T05:06:12.957Z",dateTo:"2025-02-14T21:37:12.957Z",destination:"4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa",isFavorite:!1,offers:["1b22fb31-acef-4d01-9c62-9ac18b176387","02db9a9c-6ea4-471f-9904-c4c969a26e63","530f0e32-9f97-492b-aee5-b10dd2d815a5","3344000b-4079-425a-a188-0f8be957d1c5","fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6","cf67a33c-dbea-4788-833e-e140bfbc03d0"],type:"flight"},{id:"887055c2-ef2e-4ee2-b9cf-b37994b0203b",basePrice:9261,dateFrom:"2025-02-15T19:52:12.957Z",dateTo:"2025-02-16T11:48:12.957Z",destination:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",isFavorite:!1,offers:["c28c7abe-fbf2-46ec-aec5-e673654289c7","b2615390-dfab-4c38-bca9-3116f44d25f7"],type:"bus"},{id:"530ede94-ec70-4a49-818f-07853b5411e1",basePrice:4557,dateFrom:"2025-02-16T19:36:12.957Z",dateTo:"2025-02-18T08:27:12.957Z",destination:"3113e602-f294-4341-a775-d43045a3add9",isFavorite:!1,offers:["3344000b-4079-425a-a188-0f8be957d1c5","fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6","cf67a33c-dbea-4788-833e-e140bfbc03d0"],type:"flight"},{id:"9230c1c5-a720-4dea-913f-75143dfbf3e6",basePrice:1451,dateFrom:"2025-02-19T11:51:12.957Z",dateTo:"2025-02-20T13:04:12.957Z",destination:"14ca415e-fc87-4c30-aea8-cddf7d32337e",isFavorite:!0,offers:["5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8"],type:"restaurant"},{id:"6697e2dc-75a2-40fb-b5f9-905bb98a6ec6",basePrice:5312,dateFrom:"2025-02-21T19:52:12.957Z",dateTo:"2025-02-23T20:12:12.957Z",destination:"95a5a841-a2d5-48bd-83e1-ca44ac9869ea",isFavorite:!1,offers:["a749c843-4981-4d38-892b-076437c24597"],type:"check-in"},{id:"eb868096-16d9-4cf6-9794-5fb0cbe9d180",basePrice:9374,dateFrom:"2025-02-25T15:53:12.957Z",dateTo:"2025-02-26T13:07:12.957Z",destination:"a734ae85-9fce-4e1a-af06-ee28e9c10dd2",isFavorite:!0,offers:["601f1aa7-01b5-4c99-9c64-8270b76ee1ed","a2026208-7504-446b-ae62-f71e89879210","f3a8c33b-3019-4bc8-9881-fdcf296b9027"],type:"ship"},{id:"135ae796-b739-4e79-ac23-26af62dd1d40",basePrice:9467,dateFrom:"2025-02-28T10:42:12.957Z",dateTo:"2025-02-28T18:00:12.957Z",destination:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",isFavorite:!0,offers:["f3a8c33b-3019-4bc8-9881-fdcf296b9027"],type:"ship"},{id:"afaa2a2e-359f-4c0e-bab9-7dda1aa3c355",basePrice:6018,dateFrom:"2025-03-01T06:23:12.957Z",dateTo:"2025-03-01T17:12:12.957Z",destination:"a734ae85-9fce-4e1a-af06-ee28e9c10dd2",isFavorite:!0,offers:[],type:"ship"},{id:"0aa74724-2cfd-40e0-a430-605f89b302ff",basePrice:7902,dateFrom:"2025-03-03T05:25:12.957Z",dateTo:"2025-03-03T12:50:12.957Z",destination:"14ca415e-fc87-4c30-aea8-cddf7d32337e",isFavorite:!0,offers:["eb272342-702c-4d96-bc21-2f9ff124dad0","51cf52ed-e73b-4b2e-99da-ba7a19e4fe97","8ef71e66-fe4f-41c2-90f0-84e761cacc01"],type:"taxi"},{id:"ed96bdbb-7a7d-444c-a060-7c19e8c2a99e",basePrice:1721,dateFrom:"2025-03-05T13:09:12.957Z",dateTo:"2025-03-07T01:28:12.957Z",destination:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",isFavorite:!0,offers:["1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c","659142a4-1ea2-4d02-b31f-082eba1afc8e","aea4e17c-0069-4884-9ffa-8bc5f7899075"],type:"train"},{id:"f8916817-173c-4cb1-8a2d-e7c291a721eb",basePrice:7280,dateFrom:"2025-03-07T14:43:12.957Z",dateTo:"2025-03-08T01:34:12.957Z",destination:"62a21ac4-e085-4f48-8fb5-cbd0905b67c0",isFavorite:!0,offers:["aea4e17c-0069-4884-9ffa-8bc5f7899075"],type:"train"},{id:"9a792a95-f12d-4e77-9975-ff7b2cb4bb0c",basePrice:2707,dateFrom:"2025-03-08T11:55:12.957Z",dateTo:"2025-03-09T00:27:12.957Z",destination:"3202b202-7d98-4b23-9100-bf18c0615947",isFavorite:!1,offers:["b2615390-dfab-4c38-bca9-3116f44d25f7"],type:"bus"},{id:"f5471658-eacd-4827-a923-86396f11fa48",basePrice:2198,dateFrom:"2025-03-10T18:59:12.957Z",dateTo:"2025-03-12T13:10:12.957Z",destination:"62a21ac4-e085-4f48-8fb5-cbd0905b67c0",isFavorite:!1,offers:["cfd32a95-916e-43bb-ac0b-ac92215e7ea8","dc7e4af4-1371-42fe-9f60-e75e82f96dca","cf351d11-b6cd-4ce6-86b1-09ba32e6a271","a749c843-4981-4d38-892b-076437c24597"],type:"check-in"},{id:"5814c117-808c-47dc-a1b0-6f6c2e1fdde4",basePrice:6519,dateFrom:"2025-03-13T19:40:12.957Z",dateTo:"2025-03-15T01:29:12.957Z",destination:"62a21ac4-e085-4f48-8fb5-cbd0905b67c0",isFavorite:!0,offers:["5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8"],type:"restaurant"},{id:"a70d3709-3f26-403a-8b50-dab331adc07f",basePrice:2520,dateFrom:"2025-03-16T11:39:12.957Z",dateTo:"2025-03-17T08:46:12.957Z",destination:"3202b202-7d98-4b23-9100-bf18c0615947",isFavorite:!0,offers:["8ef71e66-fe4f-41c2-90f0-84e761cacc01"],type:"taxi"},{id:"499e04b4-92df-4dda-817d-12e97aa314a8",basePrice:3545,dateFrom:"2025-03-17T16:28:12.957Z",dateTo:"2025-03-18T00:29:12.957Z",destination:"14ca415e-fc87-4c30-aea8-cddf7d32337e",isFavorite:!1,offers:[],type:"train"},{id:"a23ca076-992a-4dc7-ac17-ad67c3b24f6b",basePrice:5092,dateFrom:"2025-03-18T12:26:12.957Z",dateTo:"2025-03-19T13:25:12.957Z",destination:"3113e602-f294-4341-a775-d43045a3add9",isFavorite:!0,offers:[],type:"sightseeing"},{id:"dbc26672-bc74-4c46-b5f1-673a1f41c3ce",basePrice:7269,dateFrom:"2025-03-20T17:45:12.957Z",dateTo:"2025-03-21T07:33:12.957Z",destination:"95a5a841-a2d5-48bd-83e1-ca44ac9869ea",isFavorite:!0,offers:["ae99069c-c246-430d-8c90-effad77d4831","c28c7abe-fbf2-46ec-aec5-e673654289c7","b2615390-dfab-4c38-bca9-3116f44d25f7"],type:"bus"},{id:"3dc8b5b2-f5f5-4c5f-af84-22f65d94ce68",basePrice:1839,dateFrom:"2025-03-23T01:52:12.957Z",dateTo:"2025-03-24T04:30:12.957Z",destination:"62a21ac4-e085-4f48-8fb5-cbd0905b67c0",isFavorite:!1,offers:["1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c","659142a4-1ea2-4d02-b31f-082eba1afc8e","aea4e17c-0069-4884-9ffa-8bc5f7899075"],type:"train"},{id:"94f40d8d-8922-4d0a-818a-de955c80db83",basePrice:6244,dateFrom:"2025-03-26T01:07:12.957Z",dateTo:"2025-03-27T08:06:12.957Z",destination:"4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa",isFavorite:!1,offers:["1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c","659142a4-1ea2-4d02-b31f-082eba1afc8e","aea4e17c-0069-4884-9ffa-8bc5f7899075"],type:"train"}],d=[{id:"a734ae85-9fce-4e1a-af06-ee28e9c10dd2",description:"Den Haag - for those who value comfort and coziness",name:"Den Haag",pictures:[]},{id:"4724a5e7-1dc5-4da2-ac2b-5315f91ff1fa",description:"Rome - a perfect place to stay with a family",name:"Rome",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Rome a perfect place to stay with a family"}]},{id:"c068f6d3-e08c-4817-98a2-5b8cbd13df72",description:"Milan - with crowded streets",name:"Milan",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Milan for those who value comfort and coziness"},{src:"https://22.objects.htmlacademy.pro/static/destinations/20.jpg",description:"Milan is a beautiful city"}]},{id:"95a5a841-a2d5-48bd-83e1-ca44ac9869ea",description:"Tokio - a perfect place to stay with a family",name:"Tokio",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Tokio a perfect place to stay with a family"},{src:"https://22.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Tokio middle-eastern paradise"}]},{id:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",description:"Munich - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Munich",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/15.jpg",description:"Munich with crowded streets"},{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Munich famous for its crowded street markets with the best street food in Asia"},{src:"https://22.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Munich middle-eastern paradise"}]},{id:"62a21ac4-e085-4f48-8fb5-cbd0905b67c0",description:"Valencia - for those who value comfort and coziness",name:"Valencia",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/2.jpg",description:"Valencia a true asian pearl"},{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Valencia with an embankment of a mighty river as a centre of attraction"},{src:"https://22.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Valencia for those who value comfort and coziness"},{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Valencia a true asian pearl"}]},{id:"f67d6e7e-ca5f-4e35-a680-4ace452e934b",description:"Kopenhagen - with a beautiful old town",name:"Kopenhagen",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/17.jpg",description:"Kopenhagen famous for its crowded street markets with the best street food in Asia"}]},{id:"3202b202-7d98-4b23-9100-bf18c0615947",description:"",name:"Amsterdam",pictures:[]},{id:"14ca415e-fc87-4c30-aea8-cddf7d32337e",description:"Chamonix - with a beautiful old town",name:"Chamonix",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/16.jpg",description:"Chamonix in a middle of Europe"},{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Chamonix a perfect place to stay with a family"},{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Chamonix in a middle of Europe"},{src:"https://22.objects.htmlacademy.pro/static/destinations/1.jpg",description:"Chamonix in a middle of Europe"}]},{id:"3113e602-f294-4341-a775-d43045a3add9",description:"Barcelona - for those who value comfort and coziness",name:"Barcelona",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/19.jpg",description:"Barcelona with crowded streets"},{src:"https://22.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Barcelona a perfect place to stay with a family"},{src:"https://22.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Barcelona a true asian pearl"},{src:"https://22.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Barcelona full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://22.objects.htmlacademy.pro/static/destinations/20.jpg",description:"Barcelona famous for its crowded street markets with the best street food in Asia"}]}],f=[{type:"taxi",offers:[{id:"e4ac9df6-fe5a-40e4-a7f2-f7389e2c445e",title:"Upgrade to a business class",price:123},{id:"60fd0dc8-f396-4a75-92f6-6940a785059d",title:"Choose the radio station",price:55},{id:"eb272342-702c-4d96-bc21-2f9ff124dad0",title:"Choose temperature",price:38},{id:"51cf52ed-e73b-4b2e-99da-ba7a19e4fe97",title:"Drive quickly, I'm in a hurry",price:70},{id:"8ef71e66-fe4f-41c2-90f0-84e761cacc01",title:"Drive slowly",price:175}]},{type:"bus",offers:[{id:"ae99069c-c246-430d-8c90-effad77d4831",title:"Infotainment system",price:36},{id:"c28c7abe-fbf2-46ec-aec5-e673654289c7",title:"Order meal",price:173},{id:"b2615390-dfab-4c38-bca9-3116f44d25f7",title:"Choose seats",price:67}]},{type:"train",offers:[{id:"1cdbdfcd-ccd0-4e56-8afa-44016bbcaf4c",title:"Book a taxi at the arrival point",price:66},{id:"659142a4-1ea2-4d02-b31f-082eba1afc8e",title:"Order a breakfast",price:174},{id:"aea4e17c-0069-4884-9ffa-8bc5f7899075",title:"Wake up at a certain time",price:60}]},{type:"flight",offers:[{id:"1b22fb31-acef-4d01-9c62-9ac18b176387",title:"Choose meal",price:166},{id:"02db9a9c-6ea4-471f-9904-c4c969a26e63",title:"Choose seats",price:173},{id:"530f0e32-9f97-492b-aee5-b10dd2d815a5",title:"Upgrade to comfort class",price:108},{id:"3344000b-4079-425a-a188-0f8be957d1c5",title:"Upgrade to business class",price:100},{id:"fc5e302b-6231-4c1d-85ba-05ce2dd9e1c6",title:"Add luggage",price:124},{id:"cf67a33c-dbea-4788-833e-e140bfbc03d0",title:"Business lounge",price:120}]},{type:"check-in",offers:[{id:"bf55fdef-d2c3-4a39-8a8f-dd6d40f6b954",title:"Choose the time of check-in",price:90},{id:"cfd32a95-916e-43bb-ac0b-ac92215e7ea8",title:"Choose the time of check-out",price:61},{id:"dc7e4af4-1371-42fe-9f60-e75e82f96dca",title:"Add breakfast",price:195},{id:"cf351d11-b6cd-4ce6-86b1-09ba32e6a271",title:"Laundry",price:139},{id:"a749c843-4981-4d38-892b-076437c24597",title:"Order a meal from the restaurant",price:197}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"be02a8b1-e2ba-48f3-82a3-79f690f9638a",title:"Choose meal",price:112},{id:"6f99087f-2b81-4654-9c2b-efe1d4ef615c",title:"Choose seats",price:115},{id:"cba06821-0983-48e1-a3e0-af055ab42e69",title:"Upgrade to comfort class",price:79},{id:"601f1aa7-01b5-4c99-9c64-8270b76ee1ed",title:"Upgrade to business class",price:75},{id:"a2026208-7504-446b-ae62-f71e89879210",title:"Add luggage",price:135},{id:"f3a8c33b-3019-4bc8-9881-fdcf296b9027",title:"Business lounge",price:165}]},{type:"drive",offers:[{id:"a37cb8b6-aa11-496e-aac7-e2480b457255",title:"With automatic transmission",price:142},{id:"c2918495-5349-4436-a729-305f578c2684",title:"With air conditioning",price:174}]},{type:"restaurant",offers:[{id:"24281514-431e-4ace-a858-a5895913ef5b",title:"Choose live music",price:177},{id:"5ba171bd-9f4f-44e5-bc09-92ed8b2fb9e8",title:"Choose VIP area",price:198}]}],l=()=>f,p=()=>d,b=()=>{return(e=o)[Math.floor(Math.random()*e.length)];var e};function u(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function h(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}const m=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],v={isNew:!0,event:{id:"5e52eb63-20bf-48e3-824c-d5d4538101c7",basePrice:2511,dateFrom:"2025-02-10T00:00:00.957Z",dateTo:"2025-02-10T12:00:00.957Z",destination:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",isFavorite:!0,offers:["cba06821-0983-48e1-a3e0-af055ab42e69","601f1aa7-01b5-4c99-9c64-8270b76ee1ed","a2026208-7504-446b-ae62-f71e89879210","f3a8c33b-3019-4bc8-9881-fdcf296b9027"],type:"ship"},destination:{id:"b8f91f69-45f7-4c31-b59a-eda9d22ba341",description:"Munich - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Munich",pictures:[{src:"https://22.objects.htmlacademy.pro/static/destinations/15.jpg",description:"Munich with crowded streets"},{src:"https://22.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Munich famous for its crowded street markets with the best street food in Asia"},{src:"https://22.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Munich middle-eastern paradise"}]},offers:[{id:"be02a8b1-e2ba-48f3-82a3-79f690f9638a",title:"Choose meal",price:112},{id:"6f99087f-2b81-4654-9c2b-efe1d4ef615c",title:"Choose seats",price:115},{id:"cba06821-0983-48e1-a3e0-af055ab42e69",title:"Upgrade to comfort class",price:79},{id:"601f1aa7-01b5-4c99-9c64-8270b76ee1ed",title:"Upgrade to business class",price:75},{id:"a2026208-7504-446b-ae62-f71e89879210",title:"Add luggage",price:135},{id:"f3a8c33b-3019-4bc8-9881-fdcf296b9027",title:"Business lounge",price:165}]};class _{constructor({event:e,destination:t,offers:i,isNew:a}=v){this.event=e,this.destination=t,this.offers=i,this.isNew=a}getTemplate(){return function({event:e,destination:t,offers:i,isNew:n}){const{type:r,dateTo:c,dateFrom:o,basePrice:d}=e;return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${r}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n                  </div>\n                  \n  <div class="event__type-list">\n    <fieldset class="event__type-group">\n      <legend class="visually-hidden">Event type</legend>\n\n      ${m.map((e=>`\n        <div class="event__type-item">\n        <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n        <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${a(e)}</label>\n      </div>\n        `)).join("")}\n\n    </fieldset>\n  </div>\n  \n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      Flight\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${t.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                      <option value="Amsterdam"></option>\n                      <option value="Geneva"></option>\n                      <option value="Chamonix"></option>\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${s("YY/MM/DD HH:mm",o)}">\n                    —\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${s("YY/MM/DD HH:mm",c)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">${d}</span>\n                      €\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${d}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  ${n?"":'<button class="event__rollup-btn" type="button">\n           <span class="visually-hidden">Open event</span>\n          </button>'}\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  ${i.length?function({event:e,offers:t}){return`\n  <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n    <div class="event__available-offers">\n    ${t.map((t=>`\n      <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${e.offers.some((e=>e===t.id))?"checked":""}>\n      <label class="event__offer-label" for="event-offer-luggage-1">\n        <span class="event__offer-title">${t.title}</span>\n        +€&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </label>\n    </div>`)).join("")}\n  </section>`}({event:e,offers:i}):""}\n\n                  ${t.description?function(e){return`\n\n  <section class="event__section  event__section--destination">\n    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n    <p class="event__destination-description">${e.description}</p>\n    ${e.pictures.length?function(e){return`\n    <div class="event__photos-container">\n      <div class="event__photos-tape">\n      ${e.pictures.map((e=>`<img class="event__photo" src="${e.src}" alt="${e.description}"></img >`)).join("")}\n      </div>\n    </div>\n  `}(e):""}\n  </section>\n\n  `}(t):""}\n              </form>\n            </li>`}({event:this.event,destination:this.destination,offers:this.offers,isNew:this.isNew})}getElement(){return this.element||(this.element=u(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{constructor({event:e,destination:t,offers:i}){this.event=e,this.destination=t,this.offers=i}getTemplate(){return function(e,i,o){const{type:d,isFavorite:f,dateTo:l,dateFrom:p,basePrice:b}=e,u=f?"event__favorite-btn--active":"";return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="2019-03-18">${h=p,s("MMM D",h)}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${d}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${a(d)} Amsterdam</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="${c(p)}">${r(p)}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="${c(l)}">${r(l)}</time>\n                  </p>\n                  <p class="event__duration">${((e,i)=>{e=t()(e);const a=(i=t()(i)).diff(e,"day"),s=i.diff(e,"hour"),r=i.diff(e,"minute");return`${a?n(a):""}${a?"D ":""}${s?n(s-24*a):""}${s?"H ":""}${r?n(r-60*s):""}M`})(p,l)}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${b}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                ${o.length?function(e){return` <ul class="event__selected-offers">\n                  ${e.map((e=>`\n                    <li class="event__offer">\n                    <span class="event__offer-title">${e.title}</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${e.price}</span>\n                  </li>\n                  `)).join("")}\n            </ul>\n          `}(o):""}\n                <button class="event__favorite-btn ${u}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`;var h}(this.event,this.destination,this.offers)}getElement(){return this.element||(this.element=u(this.getTemplate())),this.element}removeElement(){this.element=null}}class g{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=u(this.getTemplate())),this.element}removeElement(){this.element=null}}class ${getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=u(this.getTemplate())),this.element}removeElement(){this.element=null}}const T=document.querySelector(".trip-controls__filters"),M=document.querySelector(".trip-events"),w=new class{events=Array.from({length:5},b);destinations=p();offers=l();getEvents(){return this.events}getDestinations(){return p()}getOffers(){return l()}getDestinationById(e){return this.destinations.find((t=>t.id===e))}getOffersByType(e){return this.offers.find((t=>t.type===e)).offers}getOffersById(e,t){return this.offers.find((e=>e.type===t)).offers.filter((t=>e.some((e=>t.id===e))))}},j=new class{listComponent=new g;constructor({eventsContainer:e,eventsModel:t}){this.eventsContainer=e,this.eventsModel=t}init(){this.events=[...this.eventsModel.getEvents()],this.destinations=[...this.eventsModel.getDestinations()],this.offers=[...this.eventsModel.getOffers()],h(new $,this.eventsContainer),h(this.listComponent,this.eventsContainer),h(new _({event:this.events[0],destination:this.eventsModel.getDestinationById(this.events[0].destination),offers:this.eventsModel.getOffersByType(this.events[0].type)}),this.listComponent.getElement()),h(new _,this.listComponent.getElement());for(let e=1;e<this.events.length;e++){const t=this.events[e],i=this.events[e].type,a=this.eventsModel.getDestinationById(t.destination),n=this.eventsModel.getOffersById(t.offers,i);h(new y({event:t,destination:a,offers:n}),this.listComponent.getElement())}}}({eventsContainer:M,eventsModel:w});h(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>'}getElement(){return this.element||(this.element=u(this.getTemplate())),this.element}removeElement(){this.element=null}},T),j.init()})()})();
//# sourceMappingURL=bundle.55003c2d31cf39bab756.js.map