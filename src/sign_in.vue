<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<h1> Sign in </h1>

	<div id="account" class="input">
		Account:
		<input placeholder="Account"/>
	</div>

	<div id="password" class="input">
		Password:
		<input type="password" placeholder="Password"/>
	</div>

	<button id="submit">Submit</button>
</template>

<style>
#sign_in {
  width: 400px;
  height: 300px;
  text-align: center;
  background-color: white;
  border: 1px solid gray;
  position: absolute;
  top: 150px;
  left: calc(50% - 200px);
  z-index: 99;
}
h1{
  margin-bottom: 50px;
}
.input{
  margin-bottom: 30px;
}
input{
  padding: 5px;
}
#submit{
  color: white;
  background-color: #1677ff;
  font-size: 15px;
  padding: 5px;
  width: 270px;
}
#submit:hover{
  background-color: #005EFF;
}
</style>
