$(document).ready(function() {
	$(".main_nav li:eq(1) a").on("click", function() {
		$(".overlay").animate (
			{
				display: "block",
				opacity: "toggle"
			}, 1000);
		$(".modal").animate (
			{
				display: "block",
				marginTop: "toggle"
			}, 2000);
	});
	
	$(".main_btna").on("click", function() {
		$(".overlay").animate (
			{
				display: "block",
				opacity: "toggle"
			}, 1000);
		$(".modal").animate(
			{
				display: "block",
				marginTop: "toggle"
			}, 2000);
	});
	
	$(".main_btn").on("click", function() {
		$(".overlay").animate(
			{
				display: "block",
				opacity: "toggle"
			}, 1000);
		$(".modal").animate (
			{
				display: "block",
				marginTop: "toggle"
			}, 2000);
	});
	
	$(".close").on("click", function() {
		$(".modal").animate(
			{
				display: "none",
				opacity: "toggle"
			}, 1000);
		$(".overlay").animate(
			{
				display: "none",
				opacity: "toggle"
			}, 1000);
	})
});