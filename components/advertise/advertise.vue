<template>
	<view>
        <view v-if="adShow">
            <ad v-if="adSelect === 0" unit-id="adunit-b82100ae7bddf4ad" @error="adShow = false" class="adapt"></ad>
            <ad-custom v-if="adSelect === 1" @error="adSelect = 2" class="adapt" unit-id="adunit-b9b2fd0e829c7388"></ad-custom>
            <ad-custom v-if="adSelect === 2" @error="adSelect = 0" class="adapt" unit-id="adunit-8fcb99da029141d0" ></ad-custom>
            <ad-custom v-if="adSelect === 3" @error="adSelect = 2" class="adapt" unit-id="adunit-281c97c91ba73fd7"></ad-custom>
        </view>
	</view>
</template>

<script>
	export default {
        name: "advertise",
        data:: function(){
           return {
               adShow: true
           }
        },
        props: {
            adSelect: {
                type: Number,
                default: 0
            }
        },
	}
</script>

<style>

</style>
