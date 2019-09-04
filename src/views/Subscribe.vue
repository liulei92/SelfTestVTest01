<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {

  },
  mounted () {
    this.ajax.fetch({
      url: 'account/api/subscribe',
      method: 'post',
      successFunc: (data) => {
        this.ajax.fetch({
          url: data,
          method: 'get',
          successFunc: (data) => {
            document.write(data)
          }
        })
      }
    })
  }
}
</script>
