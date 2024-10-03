import{r as o,j as n}from"./jsx-runtime-56DGgGmo.js";const c=[{name:"img1.jpeg",url:"https://utfs.io/f/eySWb67X0LypawLrPf46JE7GOrycKQZugpfYvhP1lTxdCNwD",caption:`Retelling 
50 paintings 
oil and paste on linen  
113x170cm (total) 
 2024`},{name:"img2.jpeg",url:"https://utfs.io/f/eySWb67X0Lypz8yt3BCaF8RvUCB0tN634gbfqj7HMh1AGlex",caption:`Partition 
 oil and paste on linen 
 200x120cm 
 2023`},{name:"img3.jpeg",url:"https://utfs.io/f/eySWb67X0Lyp6GRjPhkicNopfLslVa40TIF7YGeuC53mrjAb",caption:`Plain #10  
  oil and paste om linen 
 180x130cm 
 2023`},{name:"img4.jpeg",url:"https://utfs.io/f/eySWb67X0LyppBvWIw3QGO9byLSIco7x01Mhq42gB8dAWHFt",caption:`Partition 
 oil and paste on linen 
 200x120cm 
 2023`},{name:"img5.jpeg",url:"https://utfs.io/f/eySWb67X0Lyppif6t3QGO9byLSIco7x01Mhq42gB8dAWHFtv",caption:`Partition #2 
 oil and paste on linen 
 200x120cm 
 2023`},{name:"img6.jpeg",url:"https://utfs.io/f/eySWb67X0LypXvexFA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",caption:`Untitled (partition) #5  
 oil and paste on linen 
 200x120cm 
 2023`},{name:"img7.jpeg",url:"https://utfs.io/f/eySWb67X0Lypj2k5TOk8nw1XaegZqAUHVMdKl8cvCm2I0hzD",caption:`Untitled (partition) #3 
 oil and paste on linen 
 200x120cm 
 2023`},{name:"img8.jpeg",url:"https://utfs.io/f/eySWb67X0LypIFNJiuUmDl5xLJXVEdsPY7nCequg4AfiThHy",caption:`Partition #3 
 oil and paste on linen 
 200x120cm 
 2023 
 photography by Django van Ardenne`},{name:"img9.jpeg",url:"https://utfs.io/f/eySWb67X0LypXL6ecA98rxUQbyG5SIKEjtvlue3LsoFaAVg7",caption:`Partition #7 
 oil and paste on linen 
 200x120cm 
 2023`},{name:"public.jpeg",url:"https://utfs.io/f/eySWb67X0LypieWgMLy5aTRAEuq2SwzKC3cUnWH4vDkx9hm0/f/eySWb67X0Lyp7wM0cuo9qJo3RjhHGlD56kBLM4VXZcytWOCg",caption:`The Plain 
 oil and paste on linen
 200x480cm 
 2023`},{name:"img11.jpeg",url:"https://utfs.io/f/eySWb67X0LypypgHjOxNzB2o8gXUunE9ewIfmHb4RTVax7YA",caption:`Plain 
 oil and paste on linen
 180x130cm 
 2023`},{name:"img12.jpeg",url:"https://utfs.io/f/eySWb67X0Lyp4kUuIhQYhe8gJUBFPw5GRr6MTpWu1zAbSsl0",caption:`Untitled (partition) 
 oil and paste on linen 
 160x120cm 
 2023`}];function m(){const[e,i]=o.useState(null),l=o.useRef(null);o.useEffect(()=>{e&&l.current&&l.current.focus()},[e]);const s=t=>{t.key==="Escape"&&i(null)};return n.jsxs("div",{className:"container mx-auto py-16",children:[n.jsx("h1",{className:"text-4xl font-bold mb-8 text-center hidden",children:"Artwork"}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:c.map((t,a)=>n.jsx("div",{className:"relative cursor-pointer",role:"button",tabIndex:0,onClick:()=>i({url:t.url,caption:t.caption}),onKeyDown:p=>p.key==="Enter"&&i({url:t.url,caption:t.caption}),children:n.jsx("img",{src:t.url,alt:`Artwork ${a+1}`,className:"w-full h-auto object-cover"})},a))}),e&&n.jsx("div",{ref:l,className:"fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center",role:"dialog","aria-modal":"true",tabIndex:-1,onKeyDown:s,onClick:()=>i(null),children:n.jsxs("div",{className:"relative flex flex-col items-center justify-center w-full h-full",children:[n.jsx("img",{src:e.url,alt:"Fullscreen artwork",className:"w-auto max-w-[90vw] max-h-[90vh] object-contain md:max-w-[70vw] md:max-h-[70vh] "}),n.jsx("div",{className:"absolute bottom-5 left-5 text-white text-sm sm:text-base md:text-lg",children:e.caption.split(`
`).map((t,a)=>n.jsx("p",{children:t},a))})]})})]})}export{m as default};
