/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps ,InspectorControls} from "@wordpress/block-editor";
import {Panel,PanelRow,PanelBody,PanelGroup,Placeholder} from "@wordpress/components";
import { TextControl, RangeControl,SelectControl} from "@wordpress/components";
import MultiSelect from './MultiSelect';
// import Select from 'react-select';
// import {useState} from 'react';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
// const [selectedOption, setSelectedOption] = useState(null);

export default function Edit(props) {
	const {attributes,setAttributes} = props;
	const {display,text} = attributes;

	/**
	 * Change an Attribute Array's key value
	 * @param  {string} newval 
	 * @param  {string} key 
	 * @param  {string} aryName an attribute of type array
	 * @return {void}
	*/
	let mutAryItem = ( newval, key, aryName ) => {
		let temp = [{...attributes[ aryName ][0]}] ;
		temp[0][ key ] = newval;
		setAttributes( { [ aryName ]: temp } );
	};

	const getTextPanel = () => {
		return (
			<Panel>
				<PanelBody title="Text">
					<TextControl 
						label="Case Number Column"
						placeholder="Case #"
						value={text.casenum_name}
						onChange={(v) => mutAryItem(v,'casenum_name','text')}
					/>
					<TextControl 
						label="Status Column"
						placeholder="Status"
						value={text.status_name}
						onChange={(v) => mutAryItem(v,'status_name','text')}
					/>
					<TextControl 
						label="Error, Not Logged In"
						placeholder="Please login to view your cases"
						value={text.errornotloggedin}
						onChange={(v) => mutAryItem(v,'errornotloggedin','text')}
					/>
					<TextControl 
						label="Error, No Cases"
						placeholder="Looks like you don't have any support cases!"
						value={text.errornocases}
						onChange={(v) => mutAryItem(v,'errornocases','text')}
					/>
				</PanelBody>
			</Panel>
		);
	}

	const getDisplayPanel = () => {
		//group options into one array
		const statusShared = [
			{label: "All",value:"all"},
			{label: "Active",value:"active"},
			{label: "New", value:'new'},
			{label: "Open", value:'open'},
			{label: "Closed", value: 'closed'},
		]

		const options = {
			columns: [
				// {label: "Case Number, Date Updated, Status, Summary", value:"casenum,date_updated,status,summary"}
				{label: "Case Number",value:'casenum'},
				{label: "Date Updated",value:'date_updated'},
				{label: "Status",value:'status'},
				{label: "Summary",value:'summary'},
			],
			status: statusShared,
			userstatus: statusShared,
			orderby: [
				{label: "Oldest to Newest",value:"date_updated"},
				{label: "Dated Opened",value:"date_opened"},
			],
			dateformat: [
				{label: 'M j, Y g:ia'}
			],
		}

		return (
			<Panel>
				<PanelBody title="Display">
					<MultiSelect
						label="Columns"
						placeholder="Case Number, Date Updated, Status"
						value = {display[0].columns}
						onChange = {(v) => mutAryItem(v,'columns','display')}
						options = {options.columns}
					/>
					<SelectControl 
						label="Case Statuses"
						value={display[0].status}
						options={options.status}
						onChange = {(v) => {
							mutAryItem(v,'status','display');
							console.log(v);
						}}
					/>
					<SelectControl 
						label="User Filterable Statuses"
						value={display[0].userstatuses}
						options={options.userstatus}
						onChange={(v)=>mutAryItem(v,'userstatuses','display')}
					/>
					<SelectControl 
						label="Case Order"
						value={display[0].orderby}
						options={options.orderby}
						onChange={(v)=>mutAryItem(v,'orderby','display')}
					/>
					<TextControl
						label="Date Format"
						value={display[0].dateformat}
						options={options.dateformat}
						onChange={(v)=>mutAryItem(v,'dateformat','display')}
					/>
					<RangeControl
						label="How many cases should we display?"
						min={1}
						max={80}
						initialPosition = {display[0].limit}
						onChange={(v)=>mutAryItem(v,'limit','display')}
					/>
				</PanelBody>
			</Panel>
		);
	}

	const getInspectorControls = () => {
		return(
			<InspectorControls>
				{getDisplayPanel()}
				{getTextPanel()}
			</InspectorControls>
		) 
	} 

	//for debugging purposes only
	const displayShortCodeAtts = ([ary]) =>(
		Object.entries( ary ).map( ( [ k, v ] ) => (
			<p> { `${ k }: ${ v }` }</p>
		))
	);

	const displayAllShortCodeAtts = () =>(
		Object.entries( attributes ).map( ([k,v]) => (
			v.constructor == Array &&
			<>
				<h4>{k}</h4>
				{displayShortCodeAtts(v)}
			</>
		)) 
	);

	return (
		<div { ...useBlockProps() }>
			{getInspectorControls()}
			<Placeholder
				label="FuseDesk My Cases"
				instructions="Placeholder that will display your cases"
			/>
			{/* {displayAllShortCodeAtts()} */}
		</div>
	);
}
