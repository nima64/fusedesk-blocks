import controlsData from './controlsData';
const WP_BASEURL = WPURLS.siteurl;
// const WP_BASEURL = 'http://localhost/wordpress';
const REPS_ENDPOINT = '/wp-admin/admin-ajax.php?action=fusedesk_reps';
const DEPTS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_departments';
const CASETAGS_ENDPOINT ='/wp-admin/admin-ajax.php?action=fusedesk_casetags';
const CATEGORIES_ENDPOINT = '/wp-json/wp/v2/categories/';

const repOptions = controlsData.caseCreation[0].options
const deptOptions = controlsData.caseCreation[1].options
const casetagOptions = controlsData.caseCreation[2].options
const categoryOptions = controlsData.suggestedPosts[3].options

//normalize reps json into {label,value} format for Select Components
const normJsonToOptions = ( repsJson ) =>
	Object.entries( repsJson ).map( ( [ v, k ] ) => ( {
		label: k,
		value: v,
	} ) );

const normCatToOptions = ( jsonData ) => jsonData.map( ( obj ) => ( { label: obj.name, value: obj.id } ) );
//withRefresh only applies to fusedesk api calls
function composeOptionsFetcher( normalizer, withRefresh=false ) {
	return function ( options, endpoint ) {
		let BASEURL = WP_BASEURL + endpoint;
		let FETCHURL = withRefresh? BASEURL + '&refresh=1' : BASEURL;
		fetch( FETCHURL, {
			method: 'GET',
		} )
			.then( ( req ) => req.json() )
			.then( ( json ) => {
				// setTimeout(() => {
				//inserts into options
				normalizer( json ).forEach( ( v, i ) => {
					options[ i ] = v;
				} );
				console.log( options, json );
				console.log( 'executed fetch from new-case, endpoint ' + FETCHURL  );
				const repaintbtn = document.body.querySelector( '#fusedesk_repaintMe' );
				if ( repaintbtn ){ repaintbtn.click(); } else { console.log("couldn't repaint on init")}
				// }, 1000);
			} );
	};
}

//takes ary and store the fetched options into them
export default {
	get_rep_options: () => composeOptionsFetcher( normJsonToOptions )(repOptions,REPS_ENDPOINT),
	get_dept_options: () => composeOptionsFetcher( normJsonToOptions )(deptOptions,DEPTS_ENDPOINT),
	get_casetag_options: () => composeOptionsFetcher( normJsonToOptions )(casetagOptions,CASETAGS_ENDPOINT),
	get_rep_options_refresh: () => composeOptionsFetcher( normJsonToOptions, true )(repOptions,REPS_ENDPOINT),
	get_dept_options_refresh: () => composeOptionsFetcher( normJsonToOptions, true )(deptOptions,DEPTS_ENDPOINT),
	get_casetag_options_refresh: () => composeOptionsFetcher( normJsonToOptions, true )(casetagOptions,CASETAGS_ENDPOINT),
	get_category_options: () => composeOptionsFetcher( normCatToOptions )(categoryOptions,CATEGORIES_ENDPOINT),
}