// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-url': {},
		// to edit target browsers: use "browserslist" field in package.json
		autoprefixer: {},
		'postcss-aspect-ratio-mini': {
			/* 主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构
      <div aspectratio> <div aspectratio-content></div> </div>
      在实际使用的时候，你可以把自定义属性aspectratio和aspectratio-content换成相应的类名
      <div class='aspectratio'> <div  class='aspectratio-content'></div> </div>
      有一点需要特别注意：aspect-ratio属性不能和其他属性写在一起，否则编译出来的属性只会留下aspect-ratio的值
      */
		},
		'postcss-write-svg': {
			//主要用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理
			//建议使用background-image的这个方案
			/**
       * @svg square { @rect { fill: var(--color, black); width: 100%; height: 100%; } } #example { background: white svg(square param(--color #00b1ff)); }
       */
			utf8: false
		},
		'postcss-cssnext': {
			// 书写css未来特性，并作相应兼容处理
		},
		'postcss-px-to-viewport': {
			// 主要用来把px单位转换为vw、vh、wmin、vmax这样的视窗单位。直接在css中写px单位后，会自动转换为vw等单位，从而自适应
			viewportWidth: 750, // 视窗的宽度，对应的是设计稿的宽度，一般是750  （100vw=750px,1vw=7.5px）
			viewportHeight: 1334, // 视窗的高度，根据视窗宽度750来设定，一般制定为1334，也可以不设置
			unitPrecision: 3, // 指定px转换为视窗单位值的小数位数
			viewportUnit: 'vw', // 需要指定转换成的视窗单位，建议是vw
			selectorBlackList: [ '.ignore', '.hairlines' ], // 制定不转换为视窗单位的类名，可以自定义，可以无限添加，建议的是定义一到两个通用
			/**
       * selectorBlackList有定义的值后，在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)
       * 如：<div class="box ignore"></div>
       */
			minPixelValue: 1, // 小于或者等于1px不转为视窗单位，也可以设置为想要的值
			mediaQuery: false // 允许媒体查询中转换px
		},
		'postcss-viewport-units': {},
		// 由于cssnext和cssnano都具有autoprefixer,事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false。
		cssnano: {
			// 主要是用来压缩和清理css代码
			preset: 'advanced', // 这里依赖cssnano-preset-advanced，要下载
			autoprefixer: false,
			'postcss-zindex': false // 'postcss-zindex'会把 z-index 的值重置为 1 ，所以需要设置为false
		}
	}
};
