import AbstractQualifierEditor from './AbstractQualifierEditor';
import styles from './core.css';
import WEF_SnakEditor from './SnakEditor';

/**
 * Returns the array of claims for specified definition from entity
 *
 * @param definition
 *            {WEF_Definition}
 * @param claims
 *            Wikidata entity JSON
 * @returns {WEF_Claim[]}
 */
export default class SingleQualifierEditor extends AbstractQualifierEditor{

  constructor( propertyId, onRemove ) {
    super( onRemove );

    this.qualifierRow = $( document.createElement( 'tr' ) ).appendTo( parent );
    this.qualifierEditCell = $( document.createElement( 'td' ) ).addClass( styles.wef_qualifiers_edit_cell ).appendTo( this.qualifierRow );
    this.qualifierRemoveCell = $( document.createElement( 'td' ) ).addClass( styles.wef_button_cell ).appendTo( this.qualifierRow );

    this._onRemove = onRemove;
    this._addRemoveButton( this.qualifierRemoveCell );
  }

  initWithValue( qualifierSnak ) {
    this.wikidataSnak = qualifierSnak;
    this.propertyId = qualifierSnak.property;
    this.snakEditor = new WEF_SnakEditor( this.qualifierEditCell );
    this.snakEditor.initWithValue( qualifierSnak );
    this.wikidataOldValue = this.hasData() ? JSON.stringify( this.toSnakValue() ) : null;

    const qualifierEditor = this;
    const label = this.snakEditor.hideBehindLabel();
    label.click( function() {
      $( qualifierEditor ).trigger( 'afterShow' );
    } );
    $( qualifierEditor ).trigger( 'afterHide' );
  }

}
