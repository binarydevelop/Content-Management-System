import{j as e}from"./jsx-runtime-56DGgGmo.js";import{m as l,L as r}from"./components-C-v4od-A.js";import"./index-BoEtlhzw.js";function m(){const s=l();return e.jsxs("div",{className:"p-4",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4 text-center",children:"Games"}),e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full",children:s.events.map(a=>e.jsxs(r,{to:`/events/${a.uuid}`,className:"flex flex-col items-center p-4 border rounded shadow-2xl max-w-xs w-full transition-transform transform hover:scale-105 hover:shadow-xl",children:[e.jsx("img",{src:a.thumbnailUrl,alt:a.title,className:"mb-2 w-full h-auto rounded"}),e.jsx("h2",{className:"text-xl font-bold mb-2 text-center",children:a.title})]},a.uuid))}),e.jsxs("div",{className:"flex justify-center mt-4 space-x-4",children:[s.page>1&&e.jsx("a",{href:`?page=${s.page-1}&perPage=${s.perPage}`,className:"btn",children:"Previous"}),s.hasNextPage&&e.jsx("a",{href:`?page=${s.page+1}&perPage=${s.perPage}`,className:"btn",children:"Next"})]})]})]})}export{m as default};
