import controls from './controlsData';
import createControlRenderer from '../../lib/createControlRenderer';
import fetchCalls from './fetchCalls';
import { 
	useBlockProps,
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { Icon } from '@wordpress/icons';
import {
	Panel,
	PanelBody,
} from '@wordpress/components';

const refreshIcon = <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" style={{height:'20px',width:'20px'}}><path d="M35.3 12.7c-2.89-2.9-6.88-4.7-11.3-4.7-8.84 0-15.98 7.16-15.98 16s7.14 16 15.98 16c7.45 0 13.69-5.1 15.46-12h-4.16c-1.65 4.66-6.07 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.31 0 6.28 1.38 8.45 3.55l-6.45 6.45h14v-14l-4.7 4.7z"></path> </svg>;

let titleOptionsAry = [{label:'emtpy',value:''}]
// const stringToOptions = (s) => s.split(',').map((v) => ({label:v,value:v}) );
const stringToOptions = (s) => s.split(',').map((v,i) => { titleOptionsAry[i] = {label:v,value:v} } );
export function loadTitleOptionsAry(caseTitle){
	if (caseTitle[0].titleoptions){
		titleOptionsAry.length = 0;
		stringToOptions(caseTitle[0].titleoptions);
	}
}

export function getTitleOptionsAry(){
	return titleOptionsAry;
}
export function NewCase_InspectorControls(props){
	const { attributes, setAttributes } = props
	const {
		caseCreation,
		newCaseForm,
		caseTitle,
		formText,
		suggestedPosts,
		fileUploads,
		test,
	} = attributes;

	const mutAryItem = ( newval, key, attName ) => {
		const temp = [ { ...attributes[ attName ][ 0 ] } ];
		temp[ 0 ][ key ] = newval;
		setAttributes( { [ attName ]: temp } );
	};

	const renderControlObj = createControlRenderer( props );

	const getCaseCreationPanel = () => {
		const controlsData = controls.caseCreation;
		const inpFlex = 10;
		const RefreshButton = (props) => <button onClick={props.onClick} style={{flex:1,height:'30px',marginBottom: '8px',marginLeft: '10px'}}><Icon icon={refreshIcon}></Icon></button>
		const ControlsTemplate = (props) => (
			<div style={{display:'flex',alignItems:'flex-end'}}>
				<span style={{margin:0,flex:inpFlex}}>
				{renderControlObj(controlsData[props.index] , 'caseCreation' )}
				</span >
				<RefreshButton onClick={props.refreshCall} />
			</div>
		);
		return (
			<Panel>
				<PanelBody title="Case Creation">
					<ControlsTemplate index="0" refreshCall= {fetchCalls.get_dep_options_refresh} />
					<ControlsTemplate index="1" refreshCall= {fetchCalls.get_rep_options_refresh} />
					<ControlsTemplate index="2" refreshCall= {fetchCalls.get_casetag_options_refresh} />
				</PanelBody>
			</Panel>
		);
	};
	const getNewCaseFormPanel = () => {
		const controlsData = controls.newCaseForm;
		return (
			<Panel>
				<PanelBody title="New Case Form">
					{ controlsData.map( (v) => renderControlObj( v, 'newCaseForm' ) ) }
				</PanelBody>
			</Panel>
		);
	};
	const getCaseTitlePanel = () => {
		const controlsData = controls.caseTitle;
		return (
			<Panel>
				<PanelBody title="Case Title">
						{ renderControlObj( controlsData[0],'caseTitle') }
					{
						///show other options only when showtitle checked
						caseTitle[ 0 ].showtitle && (
							<>
							{ renderControlObj( controlsData[1],'caseTitle')}
							{ renderControlObj( controlsData[2] ,'caseTitle',(v) =>{
								loadTitleOptionsAry(caseTitle);
								return v} ) }
							{/* { renderControlObj( controlsData[2] ,'caseTitle',(v) =>{ return v} ) } */}
							</>
						)
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFormTextPanel = () => {
		const controlsData = controls.formText;
		return (
			<Panel>
				<PanelBody title="Form Text">
					{ controlsData.map( ( v ) =>
						renderControlObj( v, 'formText' )
					) }
				</PanelBody>
			</Panel>
		);
	};
	const getSuggestedPostsPanel = () => {
		const controlsData = controls.suggestedPosts;
		return (
			<Panel>
				<PanelBody title="Suggested Posts">
					{
						//only render/show rest when none is not selected
						suggestedPosts[ 0 ].suggestionplacement != 'none'
							? controlsData.map( ( v ) =>
									renderControlObj( v, 'suggestedPosts' )
							  )
							: renderControlObj(
									controlsData[ 0 ],
									'suggestedPosts'
							  )
					}
				</PanelBody>
			</Panel>
		);
	};
	const getFileUploadsPanel = () => {
		const controlsData = controls.fileUploads;
		return (
			<Panel>
				<PanelBody title="File Uploads">
					{ fileUploads[ 0 ].fileupload? 
						//render all
						controlsData.map( ( v ) => renderControlObj( v, 'fileUploads' ) ) 
						: 
						renderControlObj( controlsData[ 0 ], 'fileUploads' ) }
				</PanelBody>
			</Panel>
		);
	};
	const getAdvancedPanel = () => {
		const controlsData = controls.advanced;
		return (
			<>
				{ renderControlObj(controlsData[0] ,'advanced',(v) => v.slice(-1) == ' '? v.slice(0,-1) + '-' : v ) }
				{ renderControlObj(controlsData[1] ,'advanced') }
			</>
		);
	}

	return (
		<>
		<InspectorControls>
			{ getCaseCreationPanel() }
			{ getNewCaseFormPanel() }
			{ getCaseTitlePanel() }
			{ getFormTextPanel() }
			{ getSuggestedPostsPanel() }
			{ getFileUploadsPanel() }
		</InspectorControls>
		<InspectorAdvancedControls>
			{getAdvancedPanel()}
		</InspectorAdvancedControls>
		</>
	);
}