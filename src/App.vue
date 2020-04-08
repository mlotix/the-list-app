<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
 export default {
   components: {
     Navbar
   }
 }
</script>
<style lang="scss">
#app {
  background-color: #FDF2E9;
}
input,
label,
select,
button,
textarea
{
	margin:0;
	border:0;
	padding:0;
	display:inline-block;
	vertical-align:middle;
	white-space:normal;
	background:none;
	line-height:1;
}
input:focus, textarea:focus
{
	outline:0;
}
textarea
{
	vertical-align:top;
	overflow:auto;
}
::placeholder {
  color: #414141;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #414141;
}
</style>
