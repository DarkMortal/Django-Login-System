import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root=resolve(__dirname,"src");
const output=resolve(__dirname,"build");

// https://vitejs.dev/config/
export default defineConfig({
  root:root,  //Configure the root directory
  plugins: [react()],
  build:{
    outDir: output,  //Configure the output directory
    cssCodeSplit: true,  //Enable CSS Code-spliting
    emptyOutDir: true,  //If build folder not there, it will be created
    rollupOptions:{
      //Configuring paths/routes
      input:{
        home : resolve(root,"index.html"),
        landing : resolve(root,"landing","index.html"),
        login : resolve(root,"login","index.html"),
        logout : resolve(root,"logout","index.html"),
        signup : resolve(root,"signup","index.html"),
        password : resolve(root,"password","index.html"),
      }
    }
  }
});