type Props = {
  children: string;
};

export const ContentRenderer = ({ children }: Props) => {
  return (
    <article className='break-words px-3 pb-4 text-sm text-stone-200' dangerouslySetInnerHTML={{ __html: children }} />
  );
};
