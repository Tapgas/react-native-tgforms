import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon
  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

export default icon => {
  switch (icon) {
    case 'zocial':
      return ZocialIcon;
    case 'Octicons':
      return OcticonIcon;
    case 'MaterialIcons':
      return MaterialIcon;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcon;
    case 'Ionicons':
      return Ionicon;
    case 'Foundation':
      return FoundationIcon;
    case 'EvilIcons':
      return EvilIcon;
    case 'Entypo':
      return EntypoIcon;
    case 'FontAwesome':
      return FAIcon;
    case 'SimpleLineIcons':
      return SimpleLineIcon;
    default:
      return MaterialIcon;
  }
};
