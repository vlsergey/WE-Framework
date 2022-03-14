import {EditorDefType} from './EditorDefModel';
import i18n from './i18n';

const editorDescription: EditorDefType = {
  id: 'Entity',
  linkText: i18n.entityLinkText,
  description: i18n.entityDescription,
  dialogTitle: i18n.entityDialogTitle,
  newEntityInstanceOf: 'Q35120',
  tabs: [
    {
      label: i18n.tabGeneral,
      specials: [
        {type: 'LabelsAndDescriptionArea'},
      ],
      fields: [
        {property: 'P31'} /* instance of */,
        {property: 'P279'} /* subclass of */,
      ],
    },
    {
      labelEntityId: 'P1343',
      fields: [
        {property: 'P1343'} /* described by source */,
      ],
    },
  ],
};

export default editorDescription;
