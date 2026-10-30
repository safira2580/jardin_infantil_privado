import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type GruposStackParamList = {
  GruposList: undefined;
  GrupoDetail: { grupoId: string };
};

export type NinosStackParamList = {
  NinosList: undefined;
  NinoDetail: { ninoId: string };
};

export type MaterialesStackParamList = {
  MaterialesList: undefined;
  MaterialDetail: { materialId: string };
  MaterialForm: undefined;
};

export type RootTabParamList = {
  InicioTab: undefined;
  GruposTab: NavigatorScreenParams<GruposStackParamList>;
  NinosTab: NavigatorScreenParams<NinosStackParamList>;
  MaterialesTab: NavigatorScreenParams<MaterialesStackParamList>;
  ContactoTab: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = BottomTabScreenProps<RootTabParamList, T>;

export type GruposStackScreenProps<T extends keyof GruposStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<GruposStackParamList, T>,
  BottomTabScreenProps<RootTabParamList>
>;

export type MaterialesStackScreenProps<T extends keyof MaterialesStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<MaterialesStackParamList, T>,
  BottomTabScreenProps<RootTabParamList>
>;

export type NinosStackScreenProps<T extends keyof NinosStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<NinosStackParamList, T>,
  BottomTabScreenProps<RootTabParamList>
>;
