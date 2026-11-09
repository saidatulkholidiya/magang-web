interface InfoBarisProps {
  label: string;
  nilai: string;
}

export default function InfoBaris({ label, nilai }: InfoBarisProps) {
  return (
    <p>
      <strong>{label}:</strong> {nilai}
    </p>
  );
}