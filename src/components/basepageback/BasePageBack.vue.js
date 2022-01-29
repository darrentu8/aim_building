
import Menu from '../../components/menu/Menu'
export default {
  name: 'BasePageBack',
  props: {
    type: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  components: {
    Menu
  },
  data () {
    return {
      bgclass: {
        // backgroundImage: 'url(' + require('@/assets/img/bg.png') + ')'
      },
      title: ''
    };
  },
  async mounted () {
    let title = this.$route.query.title;
    if (typeof title === 'undefined') {
      return
    }
    // param = JSON.parse(param);
    this.title = title; // param.text;
  },
  created () {
    this.$nextTick(() => {
      window.onscroll = function () {
        let headerMain = document.getElementById('header-box');
        if (window.pageYOffset >= 30) {
          headerMain.classList.add('scroll-bg');
        } else {
          headerMain.classList.remove('scroll-bg');
        }
      }
    })
  },
  methods: {
    onclickMenu () {
      // this.$refs.menu.funlist()
      this.$refs.menu.openMenu();
    },
    back () {
      this.$router.back()
    }
  }
}
